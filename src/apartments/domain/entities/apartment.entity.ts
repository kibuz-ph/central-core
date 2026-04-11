import { Tower, TowerProps } from '../../../towers/domain/entities/tower.entity';

export interface ApartmentProps {
  id?: string;
  floor: number;
  reference: string;
  size: string;
  towerId?: string | null;
  residentialComplexId: string;
  tower?: TowerProps | null;
}

export class Apartment {
  public readonly id?: string;
  public readonly floor: number;
  public readonly reference: string;
  public readonly size: string;
  public readonly towerId?: string;
  public readonly residentialComplexId: string;
  public readonly tower?: Tower;

  constructor(props: ApartmentProps) {
    this.id = props.id;
    this.floor = props.floor;
    this.reference = props.reference;
    this.size = props.size;
    this.towerId = props.towerId ?? undefined;
    this.residentialComplexId = props.residentialComplexId;
    this.tower = props.tower ? Tower.fromPrisma(props.tower) : undefined;
  }

  static fromPrisma(data: ApartmentProps): Apartment {
    return new Apartment(data);
  }
}
