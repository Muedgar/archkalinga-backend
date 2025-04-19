import { Expose } from 'class-transformer';

export class OrganizationSerializer {
  @Expose()
  id: string;

  @Expose()
  organizationName: string;

  @Expose()
  organizationAddress: string;

  @Expose()
  organizationCity: string;

  @Expose()
  organizationCountry: string;
}
