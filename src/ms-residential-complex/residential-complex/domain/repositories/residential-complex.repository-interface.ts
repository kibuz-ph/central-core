import { ResidentialComplex } from '../entities/residential-complex.entity';

export interface ResidentialComplexInterface {
  findUnique({
    conditions,
    include,
  }: {
    conditions: any;
    include?: any;
  }): Promise<ResidentialComplex | null>;
  // create(residentialComplex: ResidentialComplexProps): Promise<ResidentialComplex>;
  // findMany(): Promise<ResidentialComplex[]>;
  // delete(id: string): Promise<void>;
  // update(residentialComplex: ResidentialComplexProps): Promise<ResidentialComplex>;
}
