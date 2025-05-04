import { AppBaseEntity } from 'src/common/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ShellSubCategory } from './shellsubcategories.entity';
import { ShellPhase } from './shellphase.entity';

@Entity('shell_categories')
export class ShellCategory extends AppBaseEntity {
  @Column({ type: 'int', nullable: false })
  identifierId: number;
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @OneToMany(
    () => ShellSubCategory,
    (shellsubcategories) => shellsubcategories.shellCategory,
  )
  shellSubCategories: ShellSubCategory[];

  //  phase
  @ManyToOne(() => ShellPhase, (shellphases) => shellphases.shellCategories)
  shellPhase: ShellPhase;
}
