import { Projects } from '@prisma/client';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

export interface ProjectsRepositoryInterface {
  create(dto: CreateProjectDto, userId: number): Promise<Projects>;
  findAll(): Promise<Projects[]>;
  findUserProjectsById(userId: number);
  findById(id: number): Promise<Projects>;
  update(id: number, dto: UpdateProjectDto): Promise<any>;
  delete(id: number): Promise<Projects>;
}
