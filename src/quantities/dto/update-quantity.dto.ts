import { PartialType } from '@nestjs/swagger';
import { CreateQuantityDto } from './create-quantity.dto';

export class UpdateQuantityDto extends PartialType(CreateQuantityDto) {}
