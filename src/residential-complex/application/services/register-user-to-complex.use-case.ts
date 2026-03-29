import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { TransactionManager } from '../../../modules/transaction-manager/infrastructure/persistence/transaction-manager.prisma';
import { FindRoleByNameUseCase } from '../../../role/application/services/find-role-by-name.use-case';
import { userRoleTypes, UserRoleTypes } from '../../../role/domain/enums/user-role-types.enum';
import { CreateUserRoleUseCase } from '../../../user-role/application/services/create-user-role.use-case';
import { UserRole } from '../../../user-role/domain/entities/user-role.entity';
import { UserRoleRepositoryInterface } from '../../../user-role/domain/repositories/user-role.repository-interface';
import { CreateUserDto } from '../../../users/application/dto/create-user.dto';
import { UserResponseDto } from '../../../users/application/dto/user-response.dto';
import { CreateUserUseCase } from '../../../users/application/services/create-user.use-case';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { FindResidentialComplexUseCase } from './find-residential-complex.use-case';

@Injectable()
export class RegisterUserToComplexUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('UserRoleRepositoryInterface')
    private readonly userRoleRepository: UserRoleRepositoryInterface,
    private readonly findResidentialComplexUseCase: FindResidentialComplexUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findRoleByNameUseCase: FindRoleByNameUseCase,
    private readonly createUserRoleUseCase: CreateUserRoleUseCase,
    private readonly transactionManager: TransactionManager,
  ) {}

  async execute(
    userData: CreateUserDto,
    residentialComplexId: string,
    role: UserRoleTypes,
  ): Promise<UserResponseDto> {
    await this.findResidentialComplexUseCase.executeById(residentialComplexId);

    const foundRole = await this.findRoleByNameUseCase.findByName(role);
    if (!foundRole) throw new DomainException(`Role ${role} not found. Run seeds first.`);

    if (role === userRoleTypes.ADMIN) {
      const existingAdmin = await this.userRoleRepository.findFirst({
        conditions: { residentialComplexId, roleId: foundRole.id as string },
      });
      if (existingAdmin) {
        throw new DomainException({
          message: 'This residential complex already has an ADMIN assigned',
          statusCode: HttpStatus.CONFLICT,
        });
      }
    }

    const existingUser = await this.userRepository.findUnique({
      conditions: { email: userData.email },
    });

    if (existingUser) {
      const existingUserRole = await this.userRoleRepository.findUnique({
        conditions: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          userId_roleId_residentialComplexId: {
            userId: existingUser.id as string,
            roleId: foundRole.id as string,
            residentialComplexId,
          },
        },
      });

      if (existingUserRole) {
        throw new DomainException({
          message: `User already has role ${role} in this residential complex`,
          statusCode: HttpStatus.CONFLICT,
        });
      }

      await this.createUserRoleUseCase.create(
        new UserRole({
          userId: existingUser.id as string,
          roleId: foundRole.id as string,
          residentialComplexId,
        }),
      );

      return UserResponseDto.fromEntities({ ...existingUser, userDetail: undefined });
    }

    // TODO: send generatedPassword via email
    const generatedPassword = `Kbz${randomBytes(8).toString('hex')}!`;

    const createdUser = await this.transactionManager.run(async tx => {
      const user = await this.createUserUseCase.create(
        { ...userData, password: generatedPassword },
        tx,
      );

      await this.createUserRoleUseCase.create(
        new UserRole({
          userId: user.id as string,
          roleId: foundRole.id as string,
          residentialComplexId,
        }),
        tx,
      );

      return user;
    });

    return UserResponseDto.fromEntities({ ...createdUser, userDetail: undefined });
  }
}
