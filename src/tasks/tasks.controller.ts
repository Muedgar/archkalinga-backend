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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { ListFilterDTO } from 'src/common/dtos';
import { AssignUserTaskDto } from './dto/assign-user-task.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() listFilterDTO: ListFilterDTO) {
    return this.tasksService.findAll(listFilterDTO);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/assign-users')
  assignUsersToTask(
    @Param('id') id: string,
    @Body() assignUserTaskDto: AssignUserTaskDto,
  ) {
    return this.tasksService.assignToTask(id, assignUserTaskDto);
  }

  @Patch(':id/unassign-users')
  unAssignUsersToTask(
    @Param('id') id: string,
    @Body() unAssignUserTaskDto: AssignUserTaskDto,
  ) {
    return this.tasksService.unAssignToTask(id, unAssignUserTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
