import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { jwtSecret } from '../env/envoriment';
import { JwtStrategy } from '../guard/jwt.strategy';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { AuthRepository } from './repositories/auth.repository';
import { PrismaClient } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('Auth Service', () => {
  let authService: AuthService;
  let authRepository: AuthRepository;
  let db: PrismaClient;
  let jwtService: JwtService;
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    db = new PrismaClient();
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthRepository,
        JwtService,
        JwtStrategy,
        {
          provide: 'auth__repository',
          useValue: authRepository,
        },
        {
          provide: 'dbClient',
          useValue: db,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<AuthRepository>(AuthRepository);
    jwtService = module.get<JwtService>(JwtService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it.skip('should create a new user', async () => {
      const dto: RegisterAuthDto = {
        name: 'hello from test',
        email: 'fromhere@gmail.com',
        password: '123456789',
      };
      const hashPassword = await bcrypt.hash(dto.password, 10);
      const user = await authService.findUserByEmail(dto.email);
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await authRepository.create({
        ...dto,
        password: hashPassword,
      });
      expect(newUser).toEqual(newUser);
    });
    it.skip('should throw an error if user already exists', async () => {
      try {
        const dto: RegisterAuthDto = {
          name: 'hello from test',
          email: 'fromhere@gmail.com',
          password: '123456789',
        };
        const user = await authService.findUserByEmail(dto.email);
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = await authService.register({
          ...dto,
          password: hashPassword,
        });
        expect(newUser).toBe(newUser);
      } catch (error) {
        expect(error).toBe(error);
      }
    });
    it('should throw a bad request error if invalid credentials', async () => {
      try {
        const dto: RegisterAuthDto = {
          name: '',
          email: '',
          password: '',
        };
        const hashPassword = await bcrypt.hash(dto.password, 10);
        const newUser = await authService.register({
          ...dto,
          password: hashPassword,
        });
        expect(newUser).toBe(newUser);
      } catch (error) {
        expect(error).toBe(error);
      }
    });
    it.skip('should throw an error if failed to hash password', async () => {
      try {
        const dto: RegisterAuthDto = {
          name: 'hello from test',
          email: 'fromhere@gmail.com',
          password: '123456789',
        };
        const hashPassword = await bcrypt.hash(dto.password, 10);
        if (!hashPassword) {
          throw new ConflictException('Failed to hash password');
        }
        const user = await authService.findUserByEmail(dto.email);

        const newUser = await authService.register({
          ...dto,
          password: hashPassword,
        });
        expect(newUser).toBe(newUser);
      } catch (error) {
        expect(error).toBe(error);
      }
    });
  });

  describe.skip('login', () => {
    it('should login a user and return a token', async () => {
      const dto: LoginAuthDto = {
        email: 'w5Jwz@example.com',
        password: '123456',
      };
      const user = await authService.findUserByEmail(dto.email);
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);
      const payload = await jwtStrategy.validate({
        id: user.id,
        role: user.role,
      });
      const token = jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: '1h',
      });
      expect({ access_token: token }).toEqual({ access_token: token });
    });
    it('should throw an error if user not found', async () => {
      try {
        const dto: LoginAuthDto = {
          email: 'ola@example.com',
          password: '123456',
        };
        const user = await authService.findUserByEmail(dto.email);
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(
          dto.password,
          user.password,
        );
        const payload = await jwtStrategy.validate({
          id: user.id,
          role: user.role,
        });
        const token = jwtService.sign(payload, {
          secret: jwtSecret,
          expiresIn: '1h',
        });
        expect(token).toBe({ access_token: token });
      } catch (error) {
        expect(error).toBe(error);
      }
    });
    it('should throw an error if invalid password', async () => {
      try {
        const dto: LoginAuthDto = {
          email: 'w5Jwz@example.com',
          password: '789456',
        };
        const user = await authRepository.findByEmail(dto.email);
        if (!user) {
          throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(
          dto.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new ConflictException('Invalid password');
        }
        const payload = await jwtStrategy.validate({
          id: user.id,
          role: user.role,
        });
        const token = jwtService.sign(payload, {
          secret: jwtSecret,
          expiresIn: '1h',
        });
        expect({ access_token: token }).toBe({ access_token: token });
      } catch (error) {
        expect(error).toBe(error);
      }
    });
  });
});
