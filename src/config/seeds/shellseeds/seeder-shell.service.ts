import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShellCategory } from 'src/shellshedule/entities/shellcategories.entity';
import { ShellItem } from 'src/shellshedule/entities/shellitems.entity';
import { ShellPhase } from 'src/shellshedule/entities/shellphase.entity';
import { ShellSubCategory } from 'src/shellshedule/entities/shellsubcategories.entity';
import { Repository } from 'typeorm';
import { categories, items, phases, sub_categories } from './data';

@Injectable()
export class ShellSeederService {
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

  async createShellPhases(): Promise<ShellPhase[]> {
    const phasesData = phases;
    const savedPhases: ShellPhase[] = [];
    for (let i = 0; i < phasesData.length; i++) {
      const phase = phasesData[i];

      const shellPhase = this.shellPhaseRepository.create({
        identifierId: phase.id,
        name: phase.name,
      });

      const savedPhase = await this.shellPhaseRepository.save(shellPhase);

      savedPhases.push(savedPhase);
    }

    return savedPhases;
  }

  async createShellCategories(): Promise<ShellCategory[]> {
    const categoriesData = categories;
    const savedCategories: ShellCategory[] = [];
    for (let i = 0; i < categoriesData.length; i++) {
      const category = categoriesData[i];
      const phase = await this.shellPhaseRepository.findOne({
        where: {
          identifierId: category.phase_id,
        },
      });

      if (phase) {
        const shellCategory = this.shellCategoryRepository.create({
          identifierId: category.id,
          name: category.name,
          shellPhase: phase,
        });

        const savedShellCategory =
          await this.shellCategoryRepository.save(shellCategory);
        savedCategories.push(savedShellCategory);
      }
    }
    return savedCategories;
  }

  async createShellSubCategories(): Promise<ShellSubCategory[]> {
    const subCategoriesData = sub_categories;
    const savedSubCategories: ShellSubCategory[] = [];
    for (let i = 0; i < subCategoriesData.length; i++) {
      const subCategory = subCategoriesData[i];
      const category = await this.shellCategoryRepository.findOne({
        where: {
          identifierId: subCategory.category_id,
        },
      });

      if (category) {
        const shellSubCategory = this.shellSubCategoryRepository.create({
          identifierId: subCategory.id,
          name: subCategory.name || '',
          shellCategory: category,
        });

        const savedSubShellCategory =
          await this.shellSubCategoryRepository.save(shellSubCategory);
        savedSubCategories.push(savedSubShellCategory);
      }
    }
    return savedSubCategories;
  }

  async createShellItems(): Promise<ShellItem[]> {
    const itemsData = items;
    const savedShellItems: ShellItem[] = [];
    for (let i = 0; i < itemsData.length; i++) {
      const item = itemsData[i];
      const sub_category = await this.shellSubCategoryRepository.findOne({
        where: {
          identifierId: item.sub_category_id,
        },
      });

      if (sub_category) {
        const shellItem = this.shellItemRepository.create({
          identifierId: item.id,
          description: item.item.description || '',
          references: item.item.references ? item.item.references : [''],
          unit: item.item.unit || '',
          kind: item.item.kind || '',
          shellSubCategory: sub_category,
        });

        const savedShellItem = await this.shellItemRepository.save(shellItem);
        savedShellItems.push(savedShellItem);
      }
    }
    return savedShellItems;
  }

  async deleteShellPhases(): Promise<void> {
    const shellPhases: ShellPhase[] = await this.shellPhaseRepository.find();
    for (let i = 0; i < shellPhases.length; i++) {
      const phase = shellPhases[i];
      await this.shellPhaseRepository.remove(phase);
    }
  }

  async deleteShellCategories(): Promise<void> {
    const shellCategory: ShellCategory[] =
      await this.shellCategoryRepository.find();
    for (let i = 0; i < shellCategory.length; i++) {
      const category = shellCategory[i];
      await this.shellCategoryRepository.remove(category);
    }
  }

  async deleteShellSubCategories(): Promise<void> {
    const shellSubCategory: ShellSubCategory[] =
      await this.shellSubCategoryRepository.find();
    for (let i = 0; i < shellSubCategory.length; i++) {
      const subCategory = shellSubCategory[i];
      await this.shellSubCategoryRepository.remove(subCategory);
    }
  }

  async deleteShellItems(): Promise<void> {
    const shellItems: ShellItem[] = await this.shellItemRepository.find();
    for (let i = 0; i < shellItems.length; i++) {
      const shellItem = shellItems[i];
      await this.shellItemRepository.remove(shellItem);
    }
  }
}
