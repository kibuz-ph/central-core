import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserTypeGuard } from '../common/guards/user-type.guard';
import { ComplexRoleGuard } from '../common/guards/complex-role.guard';
import { CommonAreaModule } from '../common-area/common-area.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RoleModule } from '../role/role.module';
import { CreateUserDetailUseCase } from '../user-details/application/services/create-user-detail.use-case';
import { UserDetailPrismaRepository } from '../user-details/infrastructure/persistence/user-detail.repository.prisma';
import { UserRolePrismaRepository } from '../user-role/infrastructure/persistence/user-role.repository.prisma';
import { UserRoleModule } from '../user-role/user-role.module';
import { CreateUserUseCase } from '../users/application/services/create-user.use-case';
import { UserPrismaRepository } from '../users/infrastructure/persistence/user.repository.prisma';
import { CreateResidentialComplexUseCase } from './application/services/create-residential-complex.use-case';
import { DeleteResidentialComplexUseCase } from './application/services/delete-residential-complex.use-case';
import { FindResidentialComplexesByUserUseCase } from './application/services/find-residential-complexes-by-user.use-case';
import { FindResidentialComplexUseCase } from './application/services/find-residential-complex.use-case';
import { RegisterUserToComplexUseCase } from './application/services/register-user-to-complex.use-case';
import { UpdateResidentialComplexUseCase } from './application/services/update-residential-complex.use-case';
import { ResidentialComplexPrismaRepository } from './infrastructure/persistence/residential-complex.repository.prisma';
import { ResidentialComplexController } from './presentation/residential-complex.controller';

@Module({
  controllers: [ResidentialComplexController],
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => CommonAreaModule),
    RoleModule,
    UserRoleModule,
  ],
  providers: [
    UserTypeGuard,
    ComplexRoleGuard,
    FindResidentialComplexUseCase,
    FindResidentialComplexesByUserUseCase,
    CreateResidentialComplexUseCase,
    UpdateResidentialComplexUseCase,
    DeleteResidentialComplexUseCase,
    RegisterUserToComplexUseCase,
    CreateUserUseCase,
    CreateUserDetailUseCase,
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserPrismaRepository,
    },
    {
      provide: 'UserDetailRepositoryInterface',
      useClass: UserDetailPrismaRepository,
    },
    {
      provide: 'UserRoleRepositoryInterface',
      useClass: UserRolePrismaRepository,
    },
  ],
  exports: [
    FindResidentialComplexUseCase,
    {
      provide: 'ResidentialComplexInterface',
      useClass: ResidentialComplexPrismaRepository,
    },
  ],
})
export class ResidentialComplexModule {}
