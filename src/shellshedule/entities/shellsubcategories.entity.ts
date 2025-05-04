import { AppBaseEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ShellItem } from './shellitems.entity';
import { ShellCategory } from './shellcategories.entity';

@Entity('shell_sub_categories')
export class ShellSubCategory extends AppBaseEntity {
  @Column({ type: 'int', nullable: false })
  identifierId: number;
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @OneToMany(() => ShellItem, (shellitems) => shellitems.shellSubCategory)
  shellItems: ShellItem[];

  //  category
  @ManyToOne(
    () => ShellCategory,
    (shellcategories) => shellcategories.shellSubCategories,
  )
  shellCategory: ShellCategory;
}
