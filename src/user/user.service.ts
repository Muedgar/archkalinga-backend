/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ListFilterDTO } from 'src/common/dtos';
import { FilterResponse, Mail } from 'src/common/interfaces';

import { ROLE_IS_DEACTIVATED } from 'src/role/messages';
import { RoleService } from 'src/role/role.service';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDTO, RegisterUserDTO, UpdateUserDTO } from './dtos';
import { User } from './entities/user.entity';
import {
  EMAIL_EXISTS,
  TWO_FA_ALREADY_DISABLED,
  TWO_FA_ALREADY_ENABLED,
  USER_ALREADY_ACTIVATED,
  USER_ALREADY_DEACTIVATED,
  USER_NOT_FOUND,
} from './messages';
import { UserSerializer } from './serializers';
import { ListFilterService } from 'src/common/services';
import { generateRandomPassword } from 'src/utils';
import { UserType } from './enums';
import { EmailService } from 'src/common/services/';
import { OrganizationService } from 'src/organization/organization.service';
import { REGISTER_EMAIL_JOB } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
    private emailService: EmailService,
    private organizationService: OrganizationService,
  ) {}

  async doesUserEmailExists(email: string) {
    const userWithEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (userWithEmail) {
      throw new ConflictException(EMAIL_EXISTS);
    }
  }

  private async validateRole(roleId: string) {
    const role = await this.roleService.getRole(roleId);
    if (!role.status) {
      throw new BadRequestException(ROLE_IS_DEACTIVATED);
    }
    return role;
  }

  async registerUser(
    registerUserDTO: RegisterUserDTO,
  ): Promise<UserSerializer> {
    await this.doesUserEmailExists(registerUserDTO.email);
    const password = registerUserDTO.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const role = await this.roleService.getRoleBySlug('super-admin');

    if (!role) {
      throw new BadRequestException('Super admin role is not seeded');
    }

    const user = this.userRepository.create({
      userName: registerUserDTO.userName,
      firstName: registerUserDTO.firstName,
      lastName: registerUserDTO.lastName,
      title: registerUserDTO.title,
      email: registerUserDTO.email,
      password: hashedPassword,
      role,
      userType: UserType.SYSTEM_USER,
    });

    const savedUser = await this.userRepository.save(user);

    const organizationDto = {
      organizationName: registerUserDTO.organizationName,
      organizationAddress: registerUserDTO.organizationAddress,
      organizationCity: registerUserDTO.organizationCity,
      organizationCountry: registerUserDTO.organizationCountry,
    };
    const organization = await this.organizationService.create(
      organizationDto,
      savedUser,
    );
    // update user organization
    savedUser.organization = organization;
    // save user again
    const finalUser = await this.userRepository.save(savedUser);
    // send email
    const emailData: Mail = {
      to: finalUser.email,
      data: {
        firstName: finalUser.firstName,
        email: finalUser.email,
        password,
      },
    };

    await this.emailService.sendEmail(emailData, REGISTER_EMAIL_JOB);

    return new UserSerializer(savedUser);
  }

  async createUser(
    createUserDTO: CreateUserDTO,
    requestUser: string,
  ): Promise<UserSerializer> {
    await this.doesUserEmailExists(createUserDTO.email);
    const password = generateRandomPassword(10);
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const role = await this.validateRole(createUserDTO.role);

    const userRequesting = await this.userRepository.findOne({
      where: {
        id: requestUser,
      },
    });

    if (!userRequesting) throw new BadRequestException(USER_NOT_FOUND);

    const organization = await this.organizationService.getByUser(requestUser);

    if (!organization) throw new BadRequestException('Organization not found');

    const user = this.userRepository.create({
      userName: createUserDTO.userName,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
      title: createUserDTO.title,
      email: createUserDTO.email,
      password: hashedPassword,
      role,
      organization: organization || undefined,
      userType: createUserDTO.userType
        ? createUserDTO.userType
        : UserType.SITE_AGENT,
    });

    const savedUser = await this.userRepository.save(user);
    // send email
    return new UserSerializer(savedUser);
  }

  async updateUser(id: string, updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'organization'],
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    if (updateUserDTO.userName) {
      user.userName = updateUserDTO.userName;
    }

    if (updateUserDTO.firstName) {
      user.firstName = updateUserDTO.firstName;
    }

    if (updateUserDTO.lastName) {
      user.lastName = updateUserDTO.lastName;
    }

    if (updateUserDTO.title) {
      user.title = updateUserDTO.title;
    }

    if (updateUserDTO.userType) {
      user.userType = updateUserDTO.userType;
    }

    if (updateUserDTO.role) {
      const role = await this.validateRole(updateUserDTO.role);
      user.role = role;
    }

    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async getUsers(
    filters: ListFilterDTO,
  ): Promise<FilterResponse<UserSerializer>> {
    const listFilterService = new ListFilterService(
      this.userRepository,
      UserSerializer,
    );
    const searchFields = ['firstName', 'lastName', 'userName', 'email'];

    const options: FindManyOptions<User> = {
      relations: ['role', 'role.permissions'],
    };

    return listFilterService.filter({ filters, searchFields, options });
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'organization'],
    });

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }
    return user;
  }

  async activateUser(id: string): Promise<UserSerializer> {
    const user = await this.getUser(id);

    if (user.status) {
      throw new BadRequestException(USER_ALREADY_ACTIVATED);
    }

    user.status = true;
    const savedUser = await this.userRepository.save(user);

    return new UserSerializer(savedUser);
  }

  async deactivateUser(id: string): Promise<UserSerializer> {
    const user = await this.getUser(id);

    if (!user.status) {
      throw new BadRequestException(USER_ALREADY_DEACTIVATED);
    }

    user.status = false;
    const savedUser = await this.userRepository.save(user);

    return new UserSerializer(savedUser);
  }

  async activate2FA(id: string): Promise<UserSerializer> {
    const user = await this.getUser(id);

    if (user.twoFactorAuthentication) {
      throw new BadRequestException(TWO_FA_ALREADY_ENABLED);
    }

    user.twoFactorAuthentication = true;
    const savedUser = await this.userRepository.save(user);

    return new UserSerializer(savedUser);
  }

  async deactivate2FA(id: string): Promise<UserSerializer> {
    const user = await this.getUser(id);

    if (!user.twoFactorAuthentication) {
      throw new BadRequestException(TWO_FA_ALREADY_DISABLED);
    }

    user.twoFactorAuthentication = false;
    const savedUser = await this.userRepository.save(user);

    return new UserSerializer(savedUser);
  }

  async changePassword(
    id: string,
    newPassword: string,
  ): Promise<UserSerializer> {
    const user = await this.getUser(id);
    const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    user.password = hashedPassword;

    const savedUser = await this.userRepository.save(user);
    return new UserSerializer(savedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);

    if (user.userType === UserType.SYSTEM_USER) {
      throw new BadRequestException('You can not delete a system user.');
    }

    await this.userRepository.remove(user);
  }
}
