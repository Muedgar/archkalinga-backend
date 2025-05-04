/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { Injectable, Logger } from '@nestjs/common';
import { ShellSeederService } from './seeder-shell.service';

@Injectable()
export class SeederShell {
  constructor(
    private readonly logger: Logger,
    private readonly shellService: ShellSeederService,
  ) {}

  async seed() {
    try {
      await this.loadShellData();
      this.logger.debug('Successfully completed seeding...');
    } catch (err) {
      this.logger.error('Failed seeding...', err);
    }
  }

  async loadShellData() {
    try {
      await this.shellService.deleteShellItems();
      await this.shellService.deleteShellSubCategories();
      await this.shellService.deleteShellCategories();
      await this.shellService.deleteShellPhases();
      const phases = await this.shellService.createShellPhases();
      if (!phases.length) throw new Error('No phases created');

      const categories = await this.shellService.createShellCategories();
      if (!categories.length) throw new Error('No categories created');

      const subCategories = await this.shellService.createShellSubCategories();
      if (!subCategories.length) throw new Error('No sub categories created');

      const items = await this.shellService.createShellItems();
      if (!items.length) throw new Error('No items created');

      this.logger.debug(`Seeding success:
        Phases: ${phases.length},
        Categories: ${categories.length},
        Sub Categories: ${subCategories.length},
        Items: ${items.length}`);
      return true;
    } catch (error) {
      this.logger.error('Error while seeding shell data', error);
      throw error;
    }
  }
}
