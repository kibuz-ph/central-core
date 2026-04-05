import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { FindRoleByNameUseCase } from '../../../role/application/services/find-role-by-name.use-case';
import { userRoleTypes, UserRoleTypes } from '../../../role/domain/enums/user-role-types.enum';
import { CreateUserRoleUseCase } from '../../../user-role/application/services/create-user-role.use-case';
import { UserRole } from '../../../user-role/domain/entities/user-role.entity';
import { UserRoleRepositoryInterface } from '../../../user-role/domain/repositories/user-role.repository-interface';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { FindResidentialComplexUseCase } from './find-residential-complex.use-case';

@Injectable()
export class AssignUserToComplexUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserRoleRepositoryInterface')
    private readonly userRoleRepository: UserRoleRepositoryInterface,
    private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase,
    private readonly findRoleByNameUseCase: FindRoleByNameUseCase,
    private readonly createUserRoleUseCase: CreateUserRoleUseCase,
  ) {}

  async execute(
    userId: string,
    residentialComplexId: string,
    roleName: UserRoleTypes = userRoleTypes.USER,
  ): Promise<UserResponseDto> {
    await this.findResidentialComplexUseCase.executeById(residentialComplexId);

    const user = await this.userRepository.findUnique({ conditions: { id: userId } });
    if (!user) {
      throw new DomainException({ message: 'User not found', statusCode: HttpStatus.NOT_FOUND });
    }

    const role = await this.findRoleByNameUseCase.findByName(roleName);
    if (!role) {
      throw new DomainException(`Role ${roleName} not found. Run seeds first.`);
    }

    const existingUserRole = await this.userRoleRepository.findUnique({
      conditions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        userId_roleId_residentialComplexId: {
          userId: user.id as string,
          roleId: role.id as string,
          residentialComplexId,
        },
      },
    });

    if (existingUserRole) {
      throw new DomainException({
        message: `User already has ${roleName} role in this residential complex`,
        statusCode: HttpStatus.CONFLICT,
      });
    }

    await this.createUserRoleUseCase.create(
      new UserRole({
        userId: user.id as string,
        roleId: role.id as string,
        residentialComplexId,
      }),
    );

    return UserResponseDto.fromEntities({ ...user, userDetail: undefined });
  }
}
