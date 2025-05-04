import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateQuantityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  createdById: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  itemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  taskId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
