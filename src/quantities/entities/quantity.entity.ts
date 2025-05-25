import { AppBaseEntity } from 'src/common/entities';
import { User } from 'src/user/entities';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ItemTaskToQuantity } from './item-task-quantity.entity';

@Entity('quantities')
export class Quantity extends AppBaseEntity {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  createdBy: User;

  // item task quantity
  @OneToMany(
    () => ItemTaskToQuantity,
    (itemTaskQuantity) => itemTaskQuantity.quantity,
  )
  itemTaskQuantity: ItemTaskToQuantity[];
}
