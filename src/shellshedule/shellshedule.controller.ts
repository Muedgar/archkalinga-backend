import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShellsheduleService } from './shellshedule.service';
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiOperation } from '@nestjs/swagger';

@Controller('shellshedule')
@UseGuards(JwtAuthGuard)
export class ShellsheduleController {
  constructor(private readonly shellsheduleService: ShellsheduleService) {}

  @Get('phases')
  @ApiOperation({ summary: 'Get all phases' })
  findAll() {
    return this.shellsheduleService.findAllPhases();
  }

  @Get('phases/:id')
  @ApiOperation({ summary: 'Get one phase' })
  findOne(@Param('id') id: string) {
    return this.shellsheduleService.findOnePhase(id);
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories' })
  findAllCategories() {
    return this.shellsheduleService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get one category' })
  findOneCategory(@Param('id') id: string) {
    return this.shellsheduleService.findOneCategory(id);
  }

  @Get('sub-categories')
  @ApiOperation({ summary: 'Get all sub categories' })
  findAllSubCategories() {
    return this.shellsheduleService.findAllSubCategories();
  }

  @Get('sub-categories/:id')
  @ApiOperation({ summary: 'Get one sub category' })
  findOneSubCategory(@Param('id') id: string) {
    return this.shellsheduleService.findOneSubCategory(id);
  }

  @Get('items')
  @ApiOperation({ summary: 'Get all items' })
  findAllItems() {
    return this.shellsheduleService.findAllItems();
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Get one item' })
  findOneItem(@Param('id') id: string) {
    return this.shellsheduleService.findOneItem(id);
  }
}
