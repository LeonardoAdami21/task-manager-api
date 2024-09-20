import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterAdminDto } from './dto/register-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Admin register successfully',
  })
  @ApiBadRequestResponse({ description: 'Error registering admin' })
  @ApiConflictResponse({ description: 'Password incorrect' })
  async register(@Body() dto: RegisterAdminDto) {
    return this.adminService.register(dto);
  }

  @ApiCreatedResponse({
    description: 'Admin login successfully',
  })
  @ApiBadRequestResponse({ description: 'Error logging in admin' })
  @ApiConflictResponse({ description: 'Invalid credentials' })
  @Post('login')
  async login(@Body() dto: LoginAdminDto) {
    return this.adminService.login(dto);
  }
}
