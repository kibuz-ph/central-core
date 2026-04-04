import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { generateSlug } from '../../../common/utils/slug-generator.util';
import { TransactionManager } from '../../../modules/transaction-manager/infrastructure/persistence/transaction-manager.prisma';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { FindRoleByNameUseCase } from '../../../role/application/services/find-role-by-name.use-case';
import { userRoleTypes } from '../../../role/domain/enums/user-role-types.enum';
import { CreateUserRoleUseCase } from '../../../user-role/application/services/create-user-role.use-case';
import { UserRole } from '../../../user-role/domain/entities/user-role.entity';
import { ResidentialComplexInterface } from '../../domain/repositories/residential-complex.repository-interface';
import { CreateResidentialComplexDto } from '../dto/create-residential-complex.dto';
import { ResidentialComplexResponseDto } from '../dto/residential-complex-response.dto';

@Injectable()
export class CreateResidentialComplexUseCase {
  constructor(
    @Inject('ResidentialComplexInterface')
    private readonly residentialComplexInterface: ResidentialComplexInterface,
    private readonly findRoleByNameUseCase: FindRoleByNameUseCase,
    private readonly createUserRoleUseCase: CreateUserRoleUseCase,
    private readonly transactionManager: TransactionManager,
  ) {}

  async execute(
    createResidentialComplexDto: CreateResidentialComplexDto,
    userId: string,
  ): Promise<ResidentialComplexResponseDto> {
    const slug = generateSlug(createResidentialComplexDto.name);
    const residentialComplexExists = await this.residentialComplexInterface.findUnique({
      conditions: { slug },
    });

    if (residentialComplexExists) {
      throw new DomainException({
        message: `Residential Complex with name: ${createResidentialComplexDto.name} already exists`,
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const masterRole = await this.findRoleByNameUseCase.findByName(userRoleTypes.MASTER);
    if (!masterRole) throw new DomainException('Role MASTER not found. Run seeds first.');

    const residentialComplexCreated = await this.transactionManager.run(async tx => {
      const created = await this.residentialComplexInterface.create(
        { ...createResidentialComplexDto, slug, isActive: true },
        tx,
      );

      const userRole = new UserRole({
        userId,
        roleId: masterRole.id as string,
        residentialComplexId: created.id as string,
      });

      await this.createUserRoleUseCase.create(userRole, tx);

      return created;
    });

    return ResidentialComplexResponseDto.fromEntities(residentialComplexCreated);
  }
}
