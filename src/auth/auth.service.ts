import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtSecret, passwordSecret } from '../env/envoriment';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthRepositoryInterface } from './repositories/auth.repository.interface';
import { JwtStrategy } from '../guard/jwt.strategy';

/**
 * Initializes the AuthService instance.
 *
 * @param {AuthRepositoryInterface} authRepository - The repository for authentication operations.
 * @param {JwtService} jwtService - The service for JWT operations.
 * @param {JwtStrategy} jwtStrategy - The strategy for JWT authentication.
 */
@Injectable()
export class AuthService {
  constructor(
    @Inject('auth__repository')
    private readonly authRepository: AuthRepositoryInterface,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async login(dto: LoginAuthDto) {
    try {
      const user = await this.authRepository.findByEmail(dto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordValid) {
        throw new ConflictException('Invalid password');
      }
      const payload = await this.jwtStrategy.validate({
        id: user.id,
        role: user.role,
      });
      const token = this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '1h',
      });
      return { access_token: token };
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async register(dto: RegisterAuthDto) {
    try {
      const { password, email, role } = dto;
      if (!password || !email || !role) {
        throw new BadRequestException('Missing required fields');
      }
      if (role !== 'manager' && role !== 'user') {
        throw new BadRequestException('Invalid role');
      }
      const user = await this.authRepository.findByEmail(email);
      if (user) {
        throw new Error('User already exists');
      }
      const hashPassword = await bcrypt.hash(password, 10);
      if (!hashPassword) {
        throw new ConflictException('Failed to hash password');
      }
      const newUser = await this.authRepository.create({
        ...dto,
        password: hashPassword,
        role,
      });
      return newUser;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.authRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user' + error);
    }
  }
}
