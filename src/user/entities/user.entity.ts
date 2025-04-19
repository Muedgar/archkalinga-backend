import { AppBaseEntity } from 'src/common/entities';
import { Role } from 'src/role/role.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserType } from '../enums';
import { Organization } from 'src/organization/entities/organization.entity';

@Entity('users')
export class User extends AppBaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  userName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 250, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  userType: UserType;

  @ManyToOne(() => Role, (role) => role.pkid, { nullable: true })
  role: Role;

  @ManyToOne(() => Organization, (organization) => organization.members, {
    nullable: true,
  })
  organization: Organization;

  @Column({ type: 'boolean', nullable: false, default: true })
  status: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  isDefaultPassword: boolean;

  @Column({ type: 'boolean', nullable: false, default: false })
  twoFactorAuthentication: boolean;

  @Column({ type: 'boolean', nullable: false, default: true })
  emailVerified: boolean;

  @Column({ type: 'varchar', length: 250, nullable: true })
  emailVerificationKey: string;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerificationExpiry: Date;
}
