import { PetSpeciesType } from '../enums/pet-species.enum';

export interface PetProps {
  id?: string;
  name: string;
  species: PetSpeciesType;
  apartmentId: string;
}

export class Pet {
  public readonly id?: string;
  public readonly name: string;
  public readonly species: PetSpeciesType;
  public readonly apartmentId: string;

  constructor(props: PetProps) {
    this.id = props.id;
    this.name = props.name;
    this.species = props.species;
    this.apartmentId = props.apartmentId;
  }

  static fromPrisma(data: PetProps): Pet {
    return new Pet({
      id: data.id,
      name: data.name,
      species: data.species,
      apartmentId: data.apartmentId,
    });
  }
}
