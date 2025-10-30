import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { User } from '../../../users/domain/entities/user.entity';
import { UpdateUserDetailDto } from '../../application/dtos/update-user-detail.dto';
import { UserDetail } from '../entities/user_detail.entity';

export interface UserDetailRepositoryInterface {
  create(user: User | null, userDetail: UserDetail): Promise<UserResponseDto>;
  update(id: string, userDetail: UpdateUserDetailDto): Promise<UserResponseDto>;
}
