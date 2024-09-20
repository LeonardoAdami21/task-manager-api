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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.strategy';
import { Role } from '../guard/role.guard';

@Controller('projects')
@ApiBearerAuth()
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiCreatedResponse({
    description: 'Project created successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Missing required fields' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('MANAGER')
  @Post()
  create(
    @Body() dto: CreateProjectDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.projectsService.create(dto, req.user.id);
  }

  @ApiOkResponse({ description: 'Project found successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOkResponse({ description: 'Project updated successfully' })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Missing required fields' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('MANAGER')
  @Patch(':id')
  update(

    @Body() dto: CreateProjectDto,
    @Param('id') id: number,
  ) {
    return this.projectsService.update(id, dto);
  }

  @ApiOkResponse({ description: 'Project found successfully' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.projectsService.findById(+id);
  }

  @ApiOkResponse({ description: 'Project deleted successfully' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'User not authorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('MANAGER')
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.projectsService.delete(+id);
  }
}
