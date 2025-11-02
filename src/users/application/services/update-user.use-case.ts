import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { UpdateUserDetailUseCase } from '../../../user-details/application/services/update-user-detail.use-case';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { UpdateUserDto } from '../dto/update-user.dto';

interface UserProps {
  username?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

interface UserDetailProps {
  document?: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
  secondLastName?: string;
  birthday?: Date;
  email?: string;
  phone?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly updateUserDetailUseCase: UpdateUserDetailUseCase,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const userExists = await this.userRepository.findUnique({
      conditions: { id },
    });

    if (!userExists) {
      throw new DomainException('User not found');
    }

    if (updateUserDto.email) {
      const existingEmail = await this.userRepository.findUnique({
        conditions: { email: updateUserDto.email },
      });
      if (existingEmail)
        throw new DomainException(`User with email: ${updateUserDto.email} already exits`);
    }

    const user: UserProps = {
      username: updateUserDto.username,
      email: updateUserDto.email,
      password: updateUserDto.password,
      isActive: updateUserDto.isActive,
    };
    const updateUser = await this.userRepository.update(id, user);

    const userDetail: UserDetailProps = {
      document: updateUserDto.document,
      firstName: updateUserDto.firstName,
      secondName: updateUserDto.secondName,
      lastName: updateUserDto.lastName,
      secondLastName: updateUserDto.secondLastName,
      birthday: updateUserDto.birthday,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
    };
    const updateUserDetail = await this.updateUserDetailUseCase.update(id, userDetail);

    const userUpdated = { ...updateUser, userDetail: updateUserDetail };

    return UserResponseDto.fromEntities(userUpdated);
  }
}
