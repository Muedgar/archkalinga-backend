import { PartialType } from '@nestjs/swagger';
import { CreateShellsheduleDto } from './create-shellshedule.dto';

export class UpdateShellsheduleDto extends PartialType(CreateShellsheduleDto) {}
