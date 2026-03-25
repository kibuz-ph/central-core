import { ParkingLotType } from '../../../prisma/prisma-client/client';

export { ParkingLotType };

export interface ParkingLotProps {
  id?: string;
  reference: string;
  description?: string;
  type: ParkingLotType;
  apartmentId: string;
}

export class ParkingLot {
  public readonly id?: string;
  public readonly reference: string;
  public readonly description?: string;
  public readonly type: ParkingLotType;
  public readonly apartmentId: string;

  constructor(props: ParkingLotProps) {
    this.id = props.id;
    this.reference = props.reference;
    this.description = props.description;
    this.type = props.type;
    this.apartmentId = props.apartmentId;
  }

  static fromPrisma(data: ParkingLotProps): ParkingLot {
    return new ParkingLot({
      id: data.id,
      reference: data.reference,
      description: data.description,
      type: data.type,
      apartmentId: data.apartmentId,
    });
  }
}
