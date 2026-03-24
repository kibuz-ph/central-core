import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ApartmentPrismaRepository } from '../apartments/infrastructure/persistence/apartment.repository.prisma';
import { PrismaModule } from '../prisma/prisma.module';
import { CreatePetsUseCase } from './application/services/create-pets.use-case';
import { DeletePetUseCase } from './application/services/delete-pet.use-case';
import { FindPetUseCase } from './application/services/find-pet.use-case';
import { FindPetsByApartmentUseCase } from './application/services/find-pets-by-apartment.use-case';
import { UpdatePetUseCase } from './application/services/update-pet.use-case';
import { PetPrismaRepository } from './infrastructure/persistence/pet.repository.prisma';
import { PetsController } from './presentation/pets.controller';

@Module({
  controllers: [PetsController],
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    FindPetUseCase,
    FindPetsByApartmentUseCase,
    CreatePetsUseCase,
    UpdatePetUseCase,
    DeletePetUseCase,
    {
      provide: 'PetRepositoryInterface',
      useClass: PetPrismaRepository,
    },
    {
      provide: 'ApartmentRepositoryInterface',
      useClass: ApartmentPrismaRepository,
    },
  ],
})
export class PetsModule {}
