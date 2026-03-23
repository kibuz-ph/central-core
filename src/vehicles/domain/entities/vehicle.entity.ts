import { VehicleType } from '../../../prisma/prisma-client/client';

export interface VehicleProps {
  id?: string;
  type: VehicleType;
  brand: string;
  plate: string;
  color: string;
  reference: string;
  apartmentId: string;
}

export class Vehicle {
  public readonly id?: string;
  public readonly type: VehicleType;
  public readonly brand: string;
  public readonly plate: string;
  public readonly color: string;
  public readonly reference: string;
  public readonly apartmentId: string;

  constructor(props: VehicleProps) {
    this.id = props.id;
    this.type = props.type;
    this.brand = props.brand;
    this.plate = props.plate;
    this.color = props.color;
    this.reference = props.reference;
    this.apartmentId = props.apartmentId;
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
    });
  }
}
