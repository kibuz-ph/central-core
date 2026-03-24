import { PetSpecies } from '../../../prisma/prisma-client/enums';

export const petSpecies = {
  DOG: PetSpecies.DOG,
  CAT: PetSpecies.CAT,
  BIRD: PetSpecies.BIRD,
  RABIT: PetSpecies.RABIT,
  OTHER: PetSpecies.OTHER,
} as const;

export type PetSpeciesType = (typeof petSpecies)[keyof typeof petSpecies];
