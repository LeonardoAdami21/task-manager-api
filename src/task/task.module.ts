import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaClient } from '@prisma/client';
import { TaskRepository } from './repositories/task.repository';

@Module({
  controllers: [TaskController],
  providers: [TaskService, {
    provide: 'dbClient',
    useClass: PrismaClient
  }, {
    provide: 'task__repository',
    useClass: TaskRepository
  }],
})
export class TaskModule {}
