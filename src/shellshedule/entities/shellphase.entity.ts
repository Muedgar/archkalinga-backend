import { AppBaseEntity } from 'src/common/entities';
import { Column, Entity, OneToMany } from 'typeorm';
import { ShellCategory } from './shellcategories.entity';

@Entity('shell_phases')
export class ShellPhase extends AppBaseEntity {
  @Column({ type: 'int', nullable: false })
  identifierId: number;
  @Column({ type: 'varchar', length: 200, nullable: false })
  name: string;

  @OneToMany(
    () => ShellCategory,
    (shellcategories) => shellcategories.shellPhase,
  )
  shellCategories: ShellCategory[];
}
