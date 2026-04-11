import { Apartment, ApartmentProps } from '../../../apartments/domain/entities/apartment.entity';
import { VehicleTypes } from '../enums/vehicle-types.enum';

export interface VehicleProps {
  id?: string;
  type: VehicleTypes;
  brand: string;
  plate: string;
  color: string;
  reference: string;
  apartmentId: string;
  apartment?: ApartmentProps;
}

export class Vehicle {
  public readonly id?: string;
  public readonly type: VehicleTypes;
  public readonly brand: string;
  public readonly plate: string;
  public readonly color: string;
  public readonly reference: string;
  public readonly apartmentId: string;
  public readonly apartment?: Apartment;

  constructor(props: VehicleProps) {
    this.id = props.id;
    this.type = props.type;
    this.brand = props.brand;
    this.plate = props.plate;
    this.color = props.color;
    this.reference = props.reference;
    this.apartmentId = props.apartmentId;
    this.apartment = props.apartment ? Apartment.fromPrisma(props.apartment) : undefined;
  }

  static fromPrisma(data: VehicleProps): Vehicle {
    return new Vehicle({
      id: data.id,
      type: data.type,
      brand: data.brand,
      plate: data.plate,
      color: data.color,
      reference: data.reference,
      apartmentId: data.apartmentId,
      apartment: data.apartment,
    });
  }
}
