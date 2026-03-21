import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { FindResidentialComplexUseCase } from '../../../residential-complex/application/services/find-residential-complex.use-case';
import { FindRoleByNameUseCase } from '../../../role/application/services/find-role-by-name.use-case';
import { UserRoleTypes, userRoleTypes } from '../../../role/domain/enums/user-role-types.enum';
import { CreateUserDetailUseCase } from '../../../user-details/application/services/create-user-detail.use-case';
import { UserDetail } from '../../../user-details/domain/entities/user-detail.entity';
import { UserDetailRepositoryInterface } from '../../../user-details/domain/repositories/user-detail.repository-interface';
import { CreateUserRoleUseCase } from '../../../user-role/application/services/create-user-role.use-case';
import { UserRole } from '../../../user-role/domain/entities/user-role.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { CreateUserUseCase } from './create-user.use-case';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserDetailRepositoryInterface')
    private readonly userDetailRepository: UserDetailRepositoryInterface,
    private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly createUserDetailUseCase: CreateUserDetailUseCase,
    private readonly findRoleByNameUseCase: FindRoleByNameUseCase,
    private readonly createUserRoleUseCase: CreateUserRoleUseCase,
  ) {}

  async register(
    userData: CreateUserDto,
    residentialComplexId?: string,
    role: UserRoleTypes = userRoleTypes.USER,
  ): Promise<UserResponseDto> {
    await this.validateUserDetailUniqueness(userData);

    if (residentialComplexId) {
      await this.findResidentialComplexUseCase.executeById(residentialComplexId);
    }

    const createdUser = await this.createUserUseCase.create(userData);

    const userDetail = new UserDetail({
      ...userData,
      userId: createdUser.id as string,
    });
    await this.createUserDetailUseCase.create(userDetail);

    if (residentialComplexId) {
      const foundRole = await this.findRoleByNameUseCase.findByName(role);
      if (!foundRole) throw new DomainException(`Role ${role} not found. Run seeds first.`);

      const userRole = new UserRole({
        userId: createdUser.id as string,
        roleId: foundRole.id as string,
        residentialComplexId,
      });
      await this.createUserRoleUseCase.create(userRole);
    }

    return UserResponseDto.fromEntities({ ...createdUser, userDetail: undefined });
  }

  private async validateUserDetailUniqueness(userData: CreateUserDto): Promise<void> {
    const existingDocument = await this.userDetailRepository.findUnique({
      conditions: { document: userData.document },
    });
    if (existingDocument)
      throw new DomainException(`User with document: ${userData.document} already exits`);

    const existingPhone = await this.userDetailRepository.findUnique({
      conditions: { phone: userData.phone },
    });
    if (existingPhone)
      throw new DomainException(`User with phone: ${userData.phone} already exits`);
  }
}
