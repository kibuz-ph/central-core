import { UserResponseDto } from '../../application/dto/user-response.dto';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
  findByIdAuth(id: string): Promise<User | null>;
  findByEmailAuth(email: string): Promise<User | null>;
  findAll(): Promise<UserResponseDto[] | null>;
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<UserResponseDto | null>;
  delete(id: string): Promise<boolean>;
}
