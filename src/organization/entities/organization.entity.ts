import { AppBaseEntity } from 'src/common/entities';
import { User } from 'src/user/entities';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('organizations')
export class Organization extends AppBaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  organizationName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  organizationAddress: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  organizationCity: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  organizationCountry: string;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  createdBy: User;

  @OneToMany(() => User, (user) => user.organization, { nullable: true })
  members: User[];
}
