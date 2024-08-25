import { Tasks, Users } from '@prisma/client';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';


export interface TaskRepositoryInterface {
  create(dto: CreateTaskDto, userId: number): Promise<Tasks>;
  findAll(userId: number): Promise<Tasks[]>;
  findUserById(userId: number): Promise<Tasks>;
  findById(id: number): Promise<Users>;
  update(id: number, dto: UpdateTaskDto): Promise<Tasks>;
  remove(id: number): Promise<Tasks>;
}
