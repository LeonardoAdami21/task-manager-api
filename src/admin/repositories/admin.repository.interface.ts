import { Users } from '@prisma/client';
import { RegisterAdminDto } from '../dto/register-admin.dto';


export interface AdminRepositoryInterface {
  create(dto: RegisterAdminDto): Promise<Users>;
  findByEmail(email: string): Promise<Users>;
  findById(id: number): Promise<Users>;
}
