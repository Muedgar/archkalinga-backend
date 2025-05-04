import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Project } from 'src/projects/entities/project.entity';
import { ItemTaskToQuantity } from 'src/quantities/entities/item-task-quantity.entity';
import { Quantity } from 'src/quantities/entities/quantity.entity';
import { Role } from 'src/role/role.entity';
import { Task } from 'src/tasks/entities';
import { User } from 'src/user/entities';
import { Repository } from 'typeorm';

const entityClasses = [
  Permission,
  Role,
  User,
  Organization,
  Project,
  Quantity,
  ItemTaskToQuantity,
  Task,
];

@Injectable()
export class PermissionSeederService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(): Promise<Permission[]> {
    const actions = ['create', 'read', 'update', 'delete'];
    const createdPermissions: Permission[] = [];

    for (const entityClass of entityClasses) {
      const entityName = entityClass.name.toLowerCase();

      for (const action of actions) {
        const permissionName = `${action} ${entityName}`;
        const existingPermission = await this.permissionRepository.findOne({
          where: { name: permissionName },
        });

        if (!existingPermission) {
          const permissionSlug = permissionName
            .replace(/\s+/g, '-')
            .toLowerCase();
          const permission = this.permissionRepository.create({
            name: permissionName,
            slug: permissionSlug,
          });
          const savedPermission =
            await this.permissionRepository.save(permission);
          createdPermissions.push(savedPermission);
        }
      }
    }

    return createdPermissions;
  }
}
