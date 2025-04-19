import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto, createdBy: User) {
    const organization = this.organizationRepository.create({
      ...createOrganizationDto,
      createdBy: createdBy,
    });
    return await this.organizationRepository.save(organization);
  }

  async getByUser(id: string) {
    const organization = await this.organizationRepository.findOne({
      where: {
        createdBy: {
          id,
        },
      },
    });

    return organization;
  }
}
