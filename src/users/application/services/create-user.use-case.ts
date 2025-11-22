import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { CreateUserDetailUseCase } from '../../../user-details/application/services/create-user-detail.use-case';
import { UserDetail } from '../../../user-details/domain/entities/user-detail.entity';
import { UserDetailRepositoryInterface } from '../../../user-details/domain/repositories/user-detail.repository-interface';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { User } from '../../../users/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
    private readonly createUserDetailUseCase: CreateUserDetailUseCase,
  ) {}

  async create(userData: CreateUserDto): Promise<UserResponseDto> {
    const emailExists = await this.emailExists(userData);
    const userDetailExists = await this.userDetailExists(userData);
    let userResponse;

    if (emailExists && userDetailExists) {
      const user = new User({
        ...userData,
        isActive: true,
      });
      await user.setPassword(userData.password);
      const createUser = await this.userRepository.create(user);

      if (createUser) {
        const userDetail = new UserDetail({
          ...userData,
          userId: createUser.id as string,
        });
        await this.createUserDetailUseCase.create(userDetail);

        const userCreated = { ...createUser, userDetail: undefined };
        userResponse = UserResponseDto.fromEntities(userCreated);
      }
    }

    return userResponse as UserResponseDto;
  }

  private async emailExists(userData: CreateUserDto): Promise<boolean> {
    const existingEmail = await this.userRepository.findUnique({
      conditions: { email: userData.email },
    });
    if (existingEmail) {
      if (!existingEmail.isActive)
        throw new DomainException(`User with email: ${userData.email} is inactive`);

      throw new DomainException(`User with email: ${userData.email} already exits`);
    }

    return true;
  }

  private async userDetailExists(userData: CreateUserDto): Promise<boolean> {
    const existingDocument = await this.userDetailRepository.findUnique({
      conditions: { document: userData.document },
    });
    if (existingDocument) {
      throw new DomainException(`User with document: ${userData.document} already exits`);
    }

    const existingPhone = await this.userDetailRepository.findUnique({
      conditions: { phone: userData.phone },
    });
    if (existingPhone) {
      throw new DomainException(`User with phone: ${userData.phone} already exits`);
    }

    return true;
  }
}
