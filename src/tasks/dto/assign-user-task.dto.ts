import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class AssignUserTaskDto {
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsUUID('4', { each: true, message: 'Invalid district ID' })
  @Transform(
    ({ value }) => (Array.isArray(value) ? value : [value]) as string[],
  )
  usersId: string[];
}
