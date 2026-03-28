import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApartmentPrismaRepository } from '../apartments/infrastructure/persistence/apartment.repository.prisma';
import { CreateCommonAreaUseCase } from '../common-area/application/services/create-common-area.use-case';
import { DeleteCommonAreaUseCase } from '../common-area/application/services/delete-common-area.use-case';
import { FindCommonAreasByResidentialComplexUseCase } from '../common-area/application/services/find-common-areas-by-residential-complex.use-case';
import { GetCommonAreaUseCase } from '../common-area/application/services/get-common-area.use-case';
import { UpdateCommonAreaUseCase } from '../common-area/application/services/update-common-area.use-case';
import { CommonAreaPrismaRepository } from '../common-area/infrastructure/persistence/common-area.repository.prisma';
import { ComplexRoleGuard } from '../common/guards/complex-role.guard';
import { UserTypeGuard } from '../common/guards/user-type.guard';
import { FindParkingLotUseCase } from '../parking-lots/application/services/find-parking-lot.use-case';
import { CreateParkingLotsUseCase } from '../parking-lots/application/services/create-parking-lots.use-case';
import { DeleteParkingLotUseCase } from '../parking-lots/application/services/delete-parking-lot.use-case';
import { FindParkingLotsByResidentialComplexUseCase } from '../parking-lots/application/services/find-parking-lots-by-residential-complex.use-case';
import { UpdateParkingLotUseCase } from '../parking-lots/application/services/update-parking-lot.use-case';
import { ParkingLotPrismaRepository } from '../parking-lots/infrastructure/persistence/parking-lot.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { RoleModule } from '../role/role.module';
import { CreateTowerUseCase } from '../towers/application/services/create-tower.use-case';
import { DeleteTowerUseCase } from '../towers/application/services/delete-tower.use-case';
import { FindTowersByResidentialComplexUseCase } from '../towers/application/services/find-towers-by-residential-complex.use-case';
import { FindTowersUseCase } from '../towers/application/services/find-towers.use-case';
import { UpdateTowerUseCase } from '../towers/application/services/update-tower.use-case';
import { TowerPrismaRepository } from '../towers/infrastructure/persistence/tower.repository.prisma';
import { CreateUserDetailUseCase } from '../user-details/application/services/create-user-detail.use-case';
import { UserDetailPrismaRepository } from '../user-details/infrastructure/persistence/user-detail.repository.prisma';
import { UserRolePrismaRepository } from '../user-role/infrastructure/persistence/user-role.repository.prisma';
import { UserRoleModule } from '../user-role/user-role.module';
import { CreateUserUseCase } from '../users/application/services/create-user.use-case';
import { UserPrismaRepository } from '../users/infrastructure/persistence/user.repository.prisma';
import { CreateApartmentsUseCase } from '../apartments/application/services/create-apartments.use-case';
import { DeleteApartmentUseCase } from '../apartments/application/services/delete-apartment.use-case';
import { FindApartmentUseCase } from '../apartments/application/services/find-apartment.use-case';
import { UpdateApartmentUseCase } from '../apartments/application/services/update-apartment.use-case';
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
    RoleModule,
    UserRoleModule,
  ],
  providers: [
    UserTypeGuard,
    ComplexRoleGuard,
    // Residential complex
    FindResidentialComplexUseCase,
    FindResidentialComplexesByUserUseCase,
    CreateResidentialComplexUseCase,
    UpdateResidentialComplexUseCase,
    DeleteResidentialComplexUseCase,
    RegisterUserToComplexUseCase,
    CreateUserUseCase,
    CreateUserDetailUseCase,
    // Common areas
    FindCommonAreasByResidentialComplexUseCase,
    GetCommonAreaUseCase,
    CreateCommonAreaUseCase,
    UpdateCommonAreaUseCase,
    DeleteCommonAreaUseCase,
    // Towers
    FindTowersByResidentialComplexUseCase,
    FindTowersUseCase,
    CreateTowerUseCase,
    UpdateTowerUseCase,
    DeleteTowerUseCase,
    // Parking lots
    FindParkingLotsByResidentialComplexUseCase,
    FindParkingLotUseCase,
    CreateParkingLotsUseCase,
    UpdateParkingLotUseCase,
    DeleteParkingLotUseCase,
    // Apartments
    FindApartmentUseCase,
    CreateApartmentsUseCase,
    UpdateApartmentUseCase,
    DeleteApartmentUseCase,
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
    {
      provide: 'CommonAreaRepositoryInterface',
      useClass: CommonAreaPrismaRepository,
    },
    {
      provide: 'TowerRepositoryInterface',
      useClass: TowerPrismaRepository,
    },
    {
      provide: 'ParkingLotRepositoryInterface',
      useClass: ParkingLotPrismaRepository,
    },
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
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
