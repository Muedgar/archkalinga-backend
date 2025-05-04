import { AppBaseEntity } from 'src/common/entities';
import { Project } from 'src/projects/entities/project.entity';
import { ItemTaskToQuantity } from 'src/quantities/entities/item-task-quantity.entity';
import { User } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('tasks')
@Unique(['name', 'project'])
export class Task extends AppBaseEntity {
  [x: string]: any;
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ManyToMany(() => User, { nullable: true })
  @JoinTable()
  assignedUsers: User[];

  // item task quantity
  @OneToMany(
    () => ItemTaskToQuantity,
    (itemTaskQuantity) => itemTaskQuantity.task,
  )
  itemTaskQuantity: ItemTaskToQuantity[];
}
