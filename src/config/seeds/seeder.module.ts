import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from '../db/db.config';
import { Seeder } from './seeder';
import { PermissionSeederService } from './seeder.service';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/role/role.entity';
import { RoleSeederService } from './seeder-role.service';
import { SeederRole } from './seeder-roler';
import { ShellPhase } from 'src/shellshedule/entities/shellphase.entity';
import { ShellCategory } from 'src/shellshedule/entities/shellcategories.entity';
import { ShellSubCategory } from 'src/shellshedule/entities/shellsubcategories.entity';
import { ShellItem } from 'src/shellshedule/entities/shellitems.entity';
import { ShellSeederService } from './shellseeds/seeder-shell.service';
import { SeederShell } from './shellseeds/seeder-shell';
import { ItemTaskToQuantity } from 'src/quantities/entities/item-task-quantity.entity';
import { Task } from 'src/tasks/entities';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/user/entities';
import { Organization } from 'src/organization/entities/organization.entity';
import { Quantity } from 'src/quantities/entities/quantity.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions as DataSourceOptions),
    TypeOrmModule.forFeature([
      Permission,
      Role,
      ShellPhase,
      ShellCategory,
      ShellSubCategory,
      ShellItem,
      ItemTaskToQuantity,
      Task,
      Project,
      User,
      Organization,
      Quantity,
    ]),
  ],
  providers: [
    Logger,
    Seeder,
    SeederRole,
    SeederShell,
    PermissionSeederService,
    RoleSeederService,
    ShellSeederService,
  ],
})
export class SeederModule {}
