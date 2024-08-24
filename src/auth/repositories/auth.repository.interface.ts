import { Users } from '@prisma/client';
import { RegisterAuthDto } from '../dto/register-auth.dto';

export interface AuthRepositoryInterface {
  create(dto: RegisterAuthDto): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  findById(id: number): Promise<Users>;
}
