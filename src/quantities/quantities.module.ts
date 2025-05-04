import { Module } from '@nestjs/common';
import { QuantitiesService } from './quantities.service';
import { QuantitiesController } from './quantities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quantity } from './entities/quantity.entity';
import { ItemTaskToQuantity } from './entities/item-task-quantity.entity';
import { ShellsheduleModule } from 'src/shellshedule/shellshedule.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quantity, ItemTaskToQuantity]),
    ShellsheduleModule,
    TasksModule,
    UserModule,
  ],
  controllers: [QuantitiesController],
  providers: [QuantitiesService],
  exports: [QuantitiesService],
})
export class QuantitiesModule {}
