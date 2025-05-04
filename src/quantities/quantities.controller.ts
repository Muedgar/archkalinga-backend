import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QuantitiesService } from './quantities.service';
import { CreateQuantityDto } from './dto/create-quantity.dto';
import { UpdateQuantityDto } from './dto/update-quantity.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ListFilterDTO } from 'src/common/dtos';

@Controller('quantities')
@UseGuards(JwtAuthGuard)
export class QuantitiesController {
  constructor(private readonly quantitiesService: QuantitiesService) {}

  @Post()
  create(@Body() createQuantityDto: CreateQuantityDto) {
    return this.quantitiesService.create(createQuantityDto);
  }

  @Get()
  findAll(@Query() listFilterDTO: ListFilterDTO) {
    return this.quantitiesService.findAll(listFilterDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quantitiesService.findOne(id);
  }

  @Patch(':id/item-task-to-quantity')
  update(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateQuantityDto,
  ) {
    return this.quantitiesService.update(id, updateQuantityDto);
  }

  @Delete(':id/item-task-to-quantity')
  remove(@Param('id') id: string) {
    return this.quantitiesService.remove(id);
  }
}
