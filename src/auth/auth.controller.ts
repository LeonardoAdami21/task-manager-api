import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/role.strategy';
import { Role } from '../guard/role.guard';
import { userEnumRole } from '@prisma/client';

@Controller('')
@ApiTags('Authorization and Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Login successfully',
    type: LoginAuthDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiConflictResponse({ description: 'Password incorrect' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async login(@Body() dto: LoginAuthDto) {
    return await this.authService.login(dto);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Register successfully',
    type: RegisterAuthDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @ApiConflictResponse({ description: 'User already exists' })
  async register(@Body() dto: RegisterAuthDto) {
    return await this.authService.register(dto);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Logout successfully' })
  @ApiBadRequestResponse({ description: 'Invalid token' })
  async logout(@Request() req: any) {
    return {
      message: 'Logout successfully',
    };
  }
}
