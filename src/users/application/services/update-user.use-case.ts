import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TransactionManager } from '../../../modules/transaction-manager/infrastructure/persistence/transaction-manager.prisma';
import { UpdateUserDetailUseCase } from '../../../user-details/application/services/update-user-detail.use-case';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository-interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly updateUserDetailUseCase: UpdateUserDetailUseCase,
    private readonly transactionManager: TransactionManager,
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

    const user = new User({
      username: updateUserDto.username ?? userExists.username,
      email: updateUserDto.email ?? userExists.email,
      type: userExists.type,
      isActive: userExists.isActive,
    });

    if (updateUserDto.password) {
      await user.setPassword(updateUserDto.password);
    }

    const { updatedUser, updatedUserDetail } = await this.transactionManager.run(async tx => {
      const updatedUser = await this.userRepository.update(id, user, tx);
      const updatedUserDetail = await this.updateUserDetailUseCase.update(
        id,
        {
          document: updateUserDto.document,
          firstName: updateUserDto.firstName,
          secondName: updateUserDto.secondName,
          lastName: updateUserDto.lastName,
          secondLastName: updateUserDto.secondLastName,
          birthday: updateUserDto.birthday,
          phone: updateUserDto.phone,
        },
        tx,
      );
      return { updatedUser, updatedUserDetail };
    });

    return UserResponseDto.fromEntities({ ...updatedUser, userDetail: updatedUserDetail });
  }
}
