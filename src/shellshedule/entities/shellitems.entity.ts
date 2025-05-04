import { AppBaseEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ShellSubCategory } from './shellsubcategories.entity';
import { ItemTaskToQuantity } from 'src/quantities/entities/item-task-quantity.entity';

@Entity('shell_items')
export class ShellItem extends AppBaseEntity {
  @Column({ type: 'int', nullable: false })
  identifierId: number;
  @Column({ type: 'varchar', length: 200, nullable: false })
  description: string;
  @Column({ type: 'varchar', array: true, nullable: false })
  references: string[];
  @Column({ type: 'varchar', length: 200, nullable: false })
  unit: string;
  @Column({ type: 'varchar', length: 200, nullable: true })
  quantity: string;
  @Column({ type: 'varchar', length: 200, nullable: false })
  kind: string;

  //   sub category
  @ManyToOne(
    () => ShellSubCategory,
    (shellsubcategory) => shellsubcategory.shellItems,
  )
  shellSubCategory: ShellSubCategory;

  // item task quantity
  @OneToMany(
    () => ItemTaskToQuantity,
    (itemTaskQuantity) => itemTaskQuantity.item,
  )
  itemTaskQuantity: ItemTaskToQuantity[];
}
