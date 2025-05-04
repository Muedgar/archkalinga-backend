import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShellPhase } from './entities/shellphase.entity';
import { Repository } from 'typeorm';
import { ShellCategory } from './entities/shellcategories.entity';
import { ShellSubCategory } from './entities/shellsubcategories.entity';
import { ShellItem } from './entities/shellitems.entity';

@Injectable()
export class ShellsheduleService {
  constructor(
    @InjectRepository(ShellPhase)
    private shellPhaseRepository: Repository<ShellPhase>,
    @InjectRepository(ShellCategory)
    private shellCategoryRepository: Repository<ShellCategory>,
    @InjectRepository(ShellSubCategory)
    private shellSubCategoryRepository: Repository<ShellSubCategory>,
    @InjectRepository(ShellItem)
    private shellItemRepository: Repository<ShellItem>,
  ) {}
  async findAllPhases(): Promise<ShellPhase[]> {
    return await this.shellPhaseRepository.find({
      relations: ['shellCategories'],
    });
  }

  async findOnePhase(id: string): Promise<ShellPhase> {
    const phase = await this.shellPhaseRepository.findOne({
      where: {
        id: id,
      },
      relations: ['shellCategories'],
    });

    if (!phase) throw new BadRequestException('Phase not found');

    return phase;
  }

  async findAllCategories(): Promise<ShellCategory[]> {
    return await this.shellCategoryRepository.find({
      relations: ['shellSubCategories'],
    });
  }

  async findOneCategory(id: string): Promise<ShellCategory> {
    const category = await this.shellCategoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['shellSubCategories'],
    });

    if (!category) throw new BadRequestException('Category not found');

    return category;
  }

  async findAllSubCategories(): Promise<ShellSubCategory[]> {
    return await this.shellSubCategoryRepository.find({
      relations: ['shellItems'],
    });
  }

  async findOneSubCategory(id: string): Promise<ShellSubCategory> {
    const subCategory = await this.shellSubCategoryRepository.findOne({
      where: {
        id: id,
      },
      relations: ['shellItems'],
    });

    if (!subCategory) throw new BadRequestException('Sub category not found');

    return subCategory;
  }

  async findAllItems(): Promise<ShellItem[]> {
    return await this.shellItemRepository.find({
      relations: [
        'shellSubCategory',
        'shellSubCategory.shellCategory',
        'shellSubCategory.shellCategory.shellPhase',
      ],
    });
  }

  async findAllItemsWhere(where: object): Promise<ShellItem[]> {
    return await this.shellItemRepository.find({
      where,
      relations: [
        'shellSubCategory',
        'shellSubCategory.shellCategory',
        'shellSubCategory.shellCategory.shellPhase',
      ],
    });
  }

  async findOneItem(id: string): Promise<ShellItem> {
    const item = await this.shellItemRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'shellSubCategory',
        'shellSubCategory.shellCategory',
        'shellSubCategory.shellCategory.shellPhase',
      ],
    });

    if (!item) throw new BadRequestException('Item not found');

    return item;
  }
}
