import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/guard/role.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.strategy';
import { CreateTaskDto } from './dto/create-task.dto';
import { MarkedTaskDto } from './dto/marked-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiCreatedResponse({ description: 'Tarefa criada com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuario não encontrada' })
  @ApiBadRequestResponse({ description: 'Erro ao criar tarefa' })
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: { user: { id: number } },
  ) {
  
    return this.taskService.create({
      ...createTaskDto,
      projectId: +createTaskDto.projectId,
    }, req.user.id);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'Tarefas retornadas com sucesso' })
  @ApiInternalServerErrorResponse({ description: 'Erro ao retornar tarefas' })
  findAll(@Request() req: { user: { id: number } }) {
    return this.taskService.findAll(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'Tarefa atualizada com sucesso' })
  @ApiNotFoundResponse({ description: 'Tarefa não encontrada' })
  @ApiBadRequestResponse({ description: 'Erro ao atualizar tarefa' })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.taskService.update(+id, updateTaskDto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'Tarefa marcada como concluída com sucesso' })
  @ApiNotFoundResponse({ description: 'Tarefa não encontrada' })
  @ApiBadRequestResponse({ description: 'Erro ao alterar tarefa' })
  @Patch('finish/:id')
  markedAsFinished(
    @Param('id') id: number,
    @Body() dto: MarkedTaskDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.taskService.markedAsFinished(+id, dto, req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ description: 'Tarefa removida com sucesso' })
  @ApiNotFoundResponse({ description: 'Tarefa não encontrada' })
  @ApiBadRequestResponse({ description: 'Erro ao remover tarefa' })
  @Delete(':id')
  remove(@Param('id') id: number, @Request() req: { user: { id: number } }) {
    return this.taskService.remove(+id, req.user.id);
  }
}
