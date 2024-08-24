import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/auth.repository';
import { PrismaClient } from '@prisma/client';
import { JwtStrategy } from '../guard/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    {
      provide: 'auth__repository',
      useClass: AuthRepository,
    },
    {
      provide: 'dbClient',
      useClass: PrismaClient,
    },
  ],
})
export class AuthModule {}
