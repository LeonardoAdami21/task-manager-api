import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../guard/jwt.strategy';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    JwtService,
    JwtStrategy,
    {
      provide: 'admin__repository',
      useClass: AdminRepository,
    },
    {
      provide: 'dbClient',
      useValue: new PrismaClient(),
    },
  ],
})
export class AdminModule {}
