import { AppBaseEntity } from 'src/common/entities';
import { ShellItem } from 'src/shellshedule/entities/shellitems.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Quantity } from './quantity.entity';

@Entity('itemstasksquantities')
export class ItemTaskToQuantity extends AppBaseEntity {
  @Column({ type: 'int', nullable: false })
  amount: number;
  @Column({ type: 'varchar', length: 200, nullable: true })
  unit: string;

  // item
  @ManyToOne(() => ShellItem, (shellItem) => shellItem.itemTaskQuantity, {
    nullable: false,
  })
  item: ShellItem;

  // task
  @ManyToOne(() => Task, (task) => task.itemTaskQuantity, { nullable: false })
  task: Task;

  // quantity
  @ManyToOne(() => Quantity, (quantity) => quantity.itemTaskQuantity, {
    nullable: false,
  })
  quantity: Quantity;
}
