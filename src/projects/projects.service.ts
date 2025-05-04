/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { ProjectSerializer } from './serializers';
import { ListFilterDTO } from 'src/common/dtos';
import { FilterResponse } from 'src/common/interfaces';
import { ListFilterService } from 'src/common/services';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private userService: UserService,
  ) {}
  async create(
    createProjectDto: CreateProjectDto,
    requestUser: User,
  ): Promise<ProjectSerializer> {
    const createdBy = await this.userService.getUser(requestUser.id);

    const existingProject = await this.projectRepository.findOne({
      where: {
        name: createProjectDto.name,
      },
    });

    if (existingProject)
      throw new BadRequestException('Project with given name already exists');

    const project = this.projectRepository.create({
      ...createProjectDto,
      createdBy,
    });

    const savedProject: Project = await this.projectRepository.save(project);

    return new ProjectSerializer(savedProject);
  }

  async findAll(
    filters: ListFilterDTO,
  ): Promise<FilterResponse<ProjectSerializer>> {
    const listFilterService = new ListFilterService(
      this.projectRepository,
      ProjectSerializer,
    );

    const options: FindManyOptions<Project> = {
      relations: ['createdBy', 'tasks'],
    };

    return listFilterService.filter({
      filters,
      searchFields: ['name'],
      options,
    });
  }

  async findOne(id: string): Promise<ProjectSerializer> {
    const existingProject = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['createdBy', 'tasks'],
    });

    if (!existingProject) throw new BadRequestException('Project not found');

    return plainToInstance(ProjectSerializer, existingProject, {
      excludeExtraneousValues: true,
    });
  }

  async getOne(id: string): Promise<Project> {
    const existingProject = await this.projectRepository.findOne({
      where: {
        id,
      },
      relations: ['createdBy', 'tasks'],
    });

    if (!existingProject) throw new BadRequestException('Project not found');
    return existingProject;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectSerializer> {
    const existingProject = await this.projectRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingProject) throw new BadRequestException('Project not found');

    if (updateProjectDto.name) {
      existingProject.name = updateProjectDto.name;
    }

    const savedProject = await this.projectRepository.save(existingProject);
    return plainToInstance(ProjectSerializer, savedProject, {
      excludeExtraneousValues: true,
    });
  }
}
