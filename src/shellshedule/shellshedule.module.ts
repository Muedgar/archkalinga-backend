import { Module } from '@nestjs/common';
import { ShellsheduleService } from './shellshedule.service';
import { ShellsheduleController } from './shellshedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShellPhase } from './entities/shellphase.entity';
import { ShellCategory } from './entities/shellcategories.entity';
import { ShellSubCategory } from './entities/shellsubcategories.entity';
import { ShellItem } from './entities/shellitems.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ShellPhase,
      ShellCategory,
      ShellSubCategory,
      ShellItem,
    ]),
  ],
  controllers: [ShellsheduleController],
  providers: [ShellsheduleService],
  exports: [ShellsheduleService],
})
export class ShellsheduleModule {}
