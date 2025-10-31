import { CommonArea } from '../entities/common-area.entity';

export interface CommonAreaRepositoryInterface {
  findByIdAndResidentialComplexId(
    id: string,
    residentialComplexId: string,
  ): Promise<CommonArea | null>;
  createMany(commonAreas: CommonArea[]): Promise<CommonArea[]>;
  update(
    id: string,
    residentialComplexId: string,
    commonArea: Partial<CommonArea>,
  ): Promise<CommonArea>;
  delete(id: string, residentialComplexId: string): Promise<boolean>;
}
