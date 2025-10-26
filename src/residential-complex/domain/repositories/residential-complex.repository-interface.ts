import { ResidentialComplex } from '../entities/residential-complex.entity';

export interface ResidentialComplexInterface {
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<ResidentialComplex | null>;
  create(residentialComplex: ResidentialComplex): Promise<ResidentialComplex>;
  update(id: string, residentialComplex: Partial<ResidentialComplex>): Promise<ResidentialComplex>;
  delete(id: string): Promise<boolean>;
}
