/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuantityDto } from './dto/create-quantity.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quantity } from './entities/quantity.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { ItemTaskToQuantity } from './entities/item-task-quantity.entity';
import { UserService } from 'src/user/user.service';
import { ShellsheduleService } from 'src/shellshedule/shellshedule.service';
import { TasksService } from 'src/tasks/tasks.service';
import { QuantitySerializer } from './serializers/quantity.serializer';
import { ItemTaskToQuantitySerializer } from './serializers/item-task-quantity.serializer';
import { ListFilterDTO } from 'src/common/dtos';
import { FilterResponse } from 'src/common/interfaces';
import { ListFilterService } from 'src/common/services';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities';

@Injectable()
export class QuantitiesService {
  constructor(
    @InjectRepository(Quantity)
    private quantityRepository: Repository<Quantity>,
    @InjectRepository(ItemTaskToQuantity)
    private itemTaskToQuantityRepository: Repository<ItemTaskToQuantity>,
    private userService: UserService,
    private shellService: ShellsheduleService,
    private taskService: TasksService,
  ) {}
  async create(createQuantityDto: CreateQuantityDto, requestUser: User) {
    // get task
    const task = await this.taskService.findOne(createQuantityDto.taskId);
    // get user
    const createdBy = await this.userService.getUser(requestUser.id);

    // check if this user is in the assigned users for this task

    const userAssigned = task.assignedUsers.some(
      (user) => user.id === createdBy.id,
    );

    if (!userAssigned)
      throw new BadRequestException('User is not assigned to this task.');

    // create user or get user that already exists
    // create quantity
    let quantity: Quantity;

    const existingQuantityUser = await this.quantityRepository.findOne({
      where: {
        createdBy: {
          id: createdBy.id,
        },
      },
    });

    if (existingQuantityUser) {
      quantity = existingQuantityUser;
    } else {
      quantity = this.quantityRepository.create({
        createdBy,
      });
    }

    // get item
    const item = await this.shellService.findOneItem(createQuantityDto.itemId);

    const savedQuantity = await this.quantityRepository.save(quantity);

    // create item task to quantity
    const itemTaskToQuantity = this.itemTaskToQuantityRepository.create({
      amount: Number(createQuantityDto.amount),
      unit: createQuantityDto.unit,
      item,
      task,
      quantity: savedQuantity,
    });

    const savedItemTaskToQuantity =
      await this.itemTaskToQuantityRepository.save(itemTaskToQuantity);

    return {
      savedQuantity: new QuantitySerializer(savedQuantity),
      itemTaskToQuantity: new ItemTaskToQuantitySerializer(
        savedItemTaskToQuantity,
      ),
    };
  }

  async findAll(
    filters: ListFilterDTO,
  ): Promise<FilterResponse<QuantitySerializer>> {
    const listFilterService = new ListFilterService(
      this.quantityRepository,
      QuantitySerializer,
    );

    const options: FindManyOptions<Quantity> = {
      relations: [
        'createdBy',
        'itemTaskQuantity',
        'itemTaskQuantity.item',
        'itemTaskQuantity.task',
        'itemTaskQuantity.task.project',
      ],
    };

    return listFilterService.filter({
      filters,
      searchFields: ['createdBy'],
      options,
    });
  }

  async findOne(id: string): Promise<QuantitySerializer> {
    const existingQuantity = await this.quantityRepository.findOne({
      where: {
        id,
      },
      relations: [
        'createdBy',
        'itemTaskQuantity',
        'itemTaskQuantity.item',
        'itemTaskQuantity.item.shellSubCategory',
        'itemTaskQuantity.item.shellSubCategory.shellCategory',
        'itemTaskQuantity.item.shellSubCategory.shellCategory.shellPhase',
        'itemTaskQuantity.task',
        'itemTaskQuantity.task.project',
      ],
    });

    if (!existingQuantity) throw new BadRequestException('Quantity not found');
    return plainToInstance(QuantitySerializer, existingQuantity, {
      excludeExtraneousValues: true,
    });
  }

  async findWhereItemTaskToQuantity(
    where: object,
  ): Promise<ItemTaskToQuantity[]> {
    const itemTaskToQuantities = await this.itemTaskToQuantityRepository.find({
      where,
      relations: [
        'quantity',
        'quantity.createdBy',
        'item',
        'item.shellSubCategory',
        'item.shellSubCategory.shellCategory',
        'item.shellSubCategory.shellCategory.shellPhase',
        'task',
      ],
    });

    if (!itemTaskToQuantities) throw new BadRequestException('Not found');
    return itemTaskToQuantities;
  }

  async update(
    id: string,
    updateQuantityDto: UpdateQuantityDto,
  ): Promise<ItemTaskToQuantitySerializer> {
    // one can only update ItemTaskToQuantity amount
    // create item task to quantity
    const itemTaskToQuantity = await this.itemTaskToQuantityRepository.findOne({
      where: {
        id,
      },
    });

    if (!itemTaskToQuantity)
      throw new BadRequestException('Quantity not found');

    if (updateQuantityDto.amount) {
      itemTaskToQuantity.amount = Number(updateQuantityDto.amount);
    }

    const savedItemTaskToQuantity =
      await this.itemTaskToQuantityRepository.save(itemTaskToQuantity);
    return new ItemTaskToQuantitySerializer(savedItemTaskToQuantity);
  }

  async remove(id: string) {
    // delete ItemTaskToQuantity
    const itemTaskToQuantity = await this.itemTaskToQuantityRepository.findOne({
      where: {
        id,
      },
    });

    if (!itemTaskToQuantity)
      throw new BadRequestException('Quantity not found');
    await this.itemTaskToQuantityRepository.remove(itemTaskToQuantity);
  }
}
