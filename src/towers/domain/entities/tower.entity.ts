export interface TowerProps {
  id?: string;
  name: string;
  description?: string;
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
    this.description = props.description;
    this.residentialComplexId = props.residentialComplexId;
  }

  static fromPrisma(data: TowerProps): Tower {
    return new Tower({
      id: data.id,
      name: data.name,
      description: data.description,
      residentialComplexId: data.residentialComplexId,
    });
  }
}
