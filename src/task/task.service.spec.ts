import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { TaskRepository } from './repositories/task.repository';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MarkedTaskDto } from './dto/marked-task.dto';

describe.skip('Task Service', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;
  let db: PrismaClient;

  beforeEach(async () => {
    db = new PrismaClient();
    const module = await Test.createTestingModule({
      providers: [
        TaskService,
        TaskRepository,
        {
          provide: 'task__repository',
          useClass: TaskRepository,
        },
        {
          provide: 'dbClient',
          useValue: db,
        },
      ],
    }).compile();
    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should create a new task', async () => {
    const dto: CreateTaskDto = {
      title: 'hello world',
      description: 'this is a test',
    };
    const newTask = await taskRepository.create(dto, 1);
    expect(newTask).toEqual(newTask);
  });
  it('should return a error if user not found try to create a new task', async () => {
    try {
      const dto = {
        title: 'hello from test',
        description: 'this is a test',
      };
      const task = await taskService.create(dto, 10);
      expect(task).toBe(task);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  it('should get all tasks', async () => {
    const tasks = await taskService.findAll(1);
    expect(tasks).toBeDefined();
  });
  it('should return a error if user not found', async () => {
    try {
      const tasks = await taskService.findAll(3);
      expect(tasks).toBe(tasks);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should update a task', async () => {
    const dto: UpdateTaskDto = {
      title: 'hello from test',
      description: 'this is a test',
    };

    const update = await taskService.update(1, dto, 1);
    expect(update).toBeDefined();
  });
  it('should return a error if try to update a task that does not exist', async () => {
    try {
      const dto: UpdateTaskDto = {
        title: 'hello from test',
        description: 'this is a test',
      };
      const update = await taskService.update(10, dto, 1);
      expect(update).toBe(update);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  it('should return a error if user not found to update a task', async () => {
    try {
      const dto: UpdateTaskDto = {
        title: 'hello from test',
        description: 'this is a test',
      };

      const update = await taskService.update(21, dto, 10);
      expect(update).toBe(update);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should mark a task as finished', async () => {
    const dto: MarkedTaskDto = {
      isFinished: true,
    };
    const update = await taskService.markedAsFinished(1, dto, 1);
    expect(update).toBeDefined();
  });
  it('should return a error if user not found to mark a task as finished', async () => {
    try {
      const dto: MarkedTaskDto = {
        isFinished: true,
      };
      const update = await taskService.markedAsFinished(21, dto, 10);
      expect(update).toBe(update);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  it('should return a error if try to mark a task that does not exist', async () => {
    try {
      const dto: MarkedTaskDto = {
        isFinished: true,
      };
      const update = await taskService.markedAsFinished(10, dto, 1);
      expect(update).toBe(update);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  it('should remove a task', async () => {
    const remove = await taskService.remove(1, 1);
    expect(remove).toBeDefined();
  });
  it('should return a error if user not found to remove a task', async () => {
    try {
      const remove = await taskService.remove(5, 10);
      expect(remove).toBe(remove);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
  it('should return a error if try to remove a task that does not exist', async () => {
    try {
      const remove = await taskService.remove(10, 1);
      expect(remove).toBe(remove);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
