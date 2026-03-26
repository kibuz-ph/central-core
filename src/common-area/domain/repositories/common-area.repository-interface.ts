import { CommonArea } from '../entities/common-area.entity';

export interface CommonAreaRepositoryInterface {
  findUnique({ conditions }: { conditions: any }): Promise<CommonArea | null>;
  findMany({ conditions }: { conditions: any }): Promise<CommonArea[]>;
  createMany(commonAreas: CommonArea[]): Promise<CommonArea[]>;
  update(
    id: string,
    residentialComplexId: string,
    commonArea: Partial<CommonArea>,
  ): Promise<CommonArea>;
  delete(id: string, residentialComplexId: string): Promise<boolean>;
}
