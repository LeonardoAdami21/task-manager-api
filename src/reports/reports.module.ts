import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TaskService } from '../task/task.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
