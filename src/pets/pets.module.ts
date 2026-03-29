import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreatePetsUseCase } from './application/services/create-pets.use-case';
import { DeletePetUseCase } from './application/services/delete-pet.use-case';
import { FindPetUseCase } from './application/services/find-pet.use-case';
import { FindPetsByApartmentUseCase } from './application/services/find-pets-by-apartment.use-case';
import { UpdatePetUseCase } from './application/services/update-pet.use-case';
import { PetPrismaRepository } from './infrastructure/persistence/pet.repository.prisma';

@Module({
  imports: [PrismaModule],
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
  ],
})
export class PetsModule {}
