export interface TowerProps {
  id?: string;
  name: string;
  description?: string | null;
  residentialComplexId: string;
}

export class Tower {
  public readonly id?: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly residentialComplexId: string;

  constructor(props: TowerProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description ?? undefined;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: TowerProps): Tower {
    return new Tower(data);
  }
}
