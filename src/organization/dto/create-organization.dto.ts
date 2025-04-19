import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  organizationName: string;

  @ApiProperty()
  @IsNotEmpty()
  organizationAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  organizationCity: string;

  @ApiProperty()
  @IsNotEmpty()
  organizationCountry: string;
}
