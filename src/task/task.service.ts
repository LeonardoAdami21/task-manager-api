import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepositoryInterface } from './repositories/task.repository.interface';

@Injectable()
export class TaskService {
  constructor(@Inject('task__repository') private readonly taskRepository: TaskRepositoryInterface) {}
  async create(createTaskDto: CreateTaskDto, userId: number) {
    try {
      const user = await this.taskRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const task = await this.taskRepository.create(createTaskDto, user.id);
      return task;
    } catch (error) {
      throw new BadRequestException('Failed to create task');
    }
  }

  async findAll(userId: number) {
    try {
      const user = await this.taskRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
    const tasks = await this.taskRepository.findAll(user.id);
    return tasks
    } catch (error) {
      throw new InternalServerErrorException('Failed to get all tasks');
    }
  }


  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    try {
      const user = await this.taskRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.taskRepository.update(id, updateTaskDto);
      return {
        message: 'Task updated successfully'}
    } catch (error) {
      throw new BadRequestException('Failed to update task');
    }
  }

  async remove(id: number, userId: number) {
    try {
      const user = await this.taskRepository.findUserById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const task = await this.taskRepository.findById(id);
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      await this.taskRepository.remove(id);
      return {
        message: 'Task removed successfully'
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove task');
    }
  }
}
