import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { ProjectsModule } from 'src/projects/projects.module';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), ProjectsModule, UserModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
