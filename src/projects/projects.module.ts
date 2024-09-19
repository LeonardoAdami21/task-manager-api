import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaClient } from '@prisma/client';
import { ProjectsRepository } from './repositories/projects.repository';

@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: 'dbClient',
      useValue: new PrismaClient(),
    },
    {
      provide: 'projects__repository',
      useClass: ProjectsRepository,
    },
  ],
})
export class ProjectsModule {}
