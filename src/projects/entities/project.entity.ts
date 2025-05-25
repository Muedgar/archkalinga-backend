import { AppBaseEntity } from 'src/common/entities';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/user/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('projects')
export class Project extends AppBaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  name: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn()
  createdBy: User;

  @OneToMany(() => Task, (task) => task.project, { nullable: true })
  tasks: Task[];
}
