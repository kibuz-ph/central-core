import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { generateSlug } from '../../../common/utils/slug-generator.util';
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

    const residentialComplexCreated = await this.residentialComplexInterface.create({
      ...createResidentialComplexDto,
      slug,
      isActive: true,
    });

    const masterRole = await this.findRoleByNameUseCase.findByName(userRoleTypes.MASTER);
    if (!masterRole) throw new DomainException('Role MASTER not found. Run seeds first.');

    const userRole = new UserRole({
      userId,
      roleId: masterRole.id as string,
      residentialComplexId: residentialComplexCreated.id as string,
    });

    await this.createUserRoleUseCase.create(userRole);

    return ResidentialComplexResponseDto.fromEntities(residentialComplexCreated);
  }
}
