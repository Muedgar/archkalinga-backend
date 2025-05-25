/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities';
import { FindManyOptions, Repository } from 'typeorm';
import { ProjectsService } from 'src/projects/projects.service';
import { UserService } from 'src/user/user.service';
import { AssignUserTaskDto } from './dto/assign-user-task.dto';
import { User } from 'src/user/entities';
import { ListFilterDTO } from 'src/common/dtos';
import { FilterResponse } from 'src/common/interfaces';
import { TaskSerializer } from './serializers';
import { ListFilterService } from 'src/common/services';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private projectService: ProjectsService,
    private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskSerializer> {
    const project = await this.projectService.getOne(createTaskDto.projectId);
    if (!project) throw new BadRequestException('Project not found');

    const existingTask = await this.taskRepository.findOne({
      where: {
        name: createTaskDto.name,
        project: {
          id: project.id,
        },
      },
    });

    if (existingTask)
      throw new BadRequestException(
        'Task with given name and project already exists',
      );

    const task = this.taskRepository.create({
      name: createTaskDto.name,
      project,
    });

    const savedTask = await this.taskRepository.save(task);
    return plainToInstance(TaskSerializer, savedTask, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    filters: ListFilterDTO,
  ): Promise<FilterResponse<TaskSerializer>> {
    const listFilterService = new ListFilterService(
      this.taskRepository,
      TaskSerializer,
    );

    const options: FindManyOptions<Task> = {
      relations: ['assignedUsers', 'project'],
    };

    return listFilterService.filter({
      filters,
      searchFields: ['name'],
      options,
    });
  }

  async findOne(id: string): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: ['assignedUsers', 'project'],
    });

    if (!existingTask) throw new BadRequestException('Task not found');
    return existingTask;
  }
  // findWhere
  async findWhere(where: object): Promise<Task[]> {
    const existingTasks = await this.taskRepository.find({
      where,
      relations: [
        'assignedUsers',
        'project',
        'itemTaskQuantity',
        'itemTaskQuantity.item',
        'itemTaskQuantity.item.shellSubCategory',
        'itemTaskQuantity.item.shellSubCategory.shellCategory',
        'itemTaskQuantity.item.shellSubCategory.shellCategory.shellPhase',
      ],

      /*
      relations: [
      'assignedUsers', 'project',
  'itemTaskQuantity',
  'itemTaskQuantity.item',
  'itemTaskQuantity.item.shellSubCategory',
  'itemTaskQuantity.item.shellSubCategory.shellCategory',
  'itemTaskQuantity.item.shellSubCategory.shellCategory.shellPhase',
]
      */
    });

    if (!existingTasks) throw new BadRequestException('Task not found');
    return existingTasks;
  }
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!updateTaskDto.projectId)
      throw new BadRequestException('Project is required to update task');
    const project = await this.projectService.getOne(updateTaskDto.projectId);
    if (!project) throw new BadRequestException('Project not found');

    const existingTask = await this.taskRepository.findOne({
      where: {
        name: updateTaskDto.name,
        project: {
          id: project.id,
        },
      },
    });

    if (existingTask)
      throw new BadRequestException(
        'Task with given name and project already exists',
      );
    const task = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!task) throw new BadRequestException('Task not found');

    if (updateTaskDto.name) {
      task.name = updateTaskDto.name;
    }

    if (updateTaskDto.projectId) {
      task.project = project;
    }

    const savedTask = await this.taskRepository.save(task);

    return savedTask;
  }

  async delete(id: string) {
    const existingTask = await this.taskRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingTask) throw new BadRequestException('Task not found');
    await this.taskRepository.remove(existingTask);
  }

  async assignToTask(
    id: string,
    assignUserTaskDto: AssignUserTaskDto,
  ): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({
      where: {
        id,
      },
      relations: ['assignedUsers'],
    });

    if (!existingTask) throw new BadRequestException('Task not found');

    const assignedUsers: User[] = [];

    for (let i = 0; i < assignUserTaskDto.usersId.length; i++) {
      const user = await this.userService.getUser(assignUserTaskDto.usersId[i]);
      assignedUsers.push(user);
    }

    existingTask.assignedUsers = assignedUsers;

    const savedTask = await this.taskRepository.save(existingTask);

    return savedTask;
  }

  async unAssignToTask(
    id: string,
    unAssignUserTaskDto: AssignUserTaskDto,
  ): Promise<Task> {
    const existingTask = await this.taskRepository.findOne({
      where: { id },
      relations: ['assignedUsers'],
    });

    if (!existingTask) throw new BadRequestException('Task not found');

    // Get user entities to unassign
    const unAssignedUsers: User[] = await Promise.all(
      unAssignUserTaskDto.usersId.map((userId) =>
        this.userService.getUser(userId),
      ),
    );

    // Filter out users to unassign
    existingTask.assignedUsers = existingTask.assignedUsers.filter(
      (user) => !unAssignedUsers.some((u) => u.id === user.id),
    );

    const savedTask = await this.taskRepository.save(existingTask);
    return savedTask;
  }
}
