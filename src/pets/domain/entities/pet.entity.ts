import { Apartment, ApartmentProps } from '../../../apartments/domain/entities/apartment.entity';
import { PetSpeciesType } from '../enums/pet-species.enum';

export interface PetProps {
  id?: string;
  name: string;
  species: PetSpeciesType;
  apartmentId: string;
  apartment?: ApartmentProps;
}

export class Pet {
  public readonly id?: string;
  public readonly name: string;
  public readonly species: PetSpeciesType;
  public readonly apartmentId: string;
  public readonly apartment?: Apartment;

  constructor(props: PetProps) {
    this.id = props.id;
    this.name = props.name;
    this.species = props.species;
    this.apartmentId = props.apartmentId;
    this.apartment = props.apartment ? Apartment.fromPrisma(props.apartment) : undefined;
  }

  static fromPrisma(data: PetProps): Pet {
    return new Pet({
      id: data.id,
      name: data.name,
      species: data.species,
      apartmentId: data.apartmentId,
      apartment: data.apartment,
    });
  }
}
