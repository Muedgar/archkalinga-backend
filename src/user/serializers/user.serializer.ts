import { Exclude, Expose, Type } from 'class-transformer';
import { BaseSerializer } from 'src/common/serializers';
import { RoleUserSerializer } from './role.serializer';
import { RoleSerializer } from 'src/role/serializers';

export class UserSerializer extends BaseSerializer {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  userName: string;

  @Expose()
  email: string;

  @Expose()
  title: string;

  @Expose()
  organizationName: string;

  @Expose()
  organizationAddress: string;

  @Expose()
  organizationCity: string;

  @Expose()
  organizationCountry: string;

  @Expose()
  status: boolean;

  @Expose()
  isDefaultPassword: boolean;

  @Expose()
  userType: string;

  @Expose()
  twoFactorAuthentication: boolean;

  @Expose()
  @Type(() => RoleSerializer)
  role: RoleSerializer[];

  @Exclude()
  version: number;

  @Exclude()
  password: string;

  @Exclude()
  emailVerified: boolean;

  @Exclude()
  emailVerificationKey: string;

  @Exclude()
  emailVerificationExpiry: Date;
}
