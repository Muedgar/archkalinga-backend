import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterUserDTO {
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

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
