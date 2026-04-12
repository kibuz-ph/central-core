import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../modules/pino/domain/exceptions/domain.exception';
import { FindCategoryUserByNameUseCase } from '../../../category-user/application/services/find-category-user-by-name.use-case';
import { UserApartmentTypes } from '../../../category-user/domain/enums/user-apartment-type.enum';
import { ApartmentRepositoryInterface } from '../../../apartments/domain/repositories/apartment.repository-interface';
import { UserRepositoryInterface } from '../../../users/domain/repositories/user.repository-interface';
import { UserApartment } from '../../domain/entities/user-apartment.entity';
import { UserApartmentRepositoryInterface } from '../../domain/repositories/user-apartment.repository-interface';
import { UserApartmentResponseDto } from '../dto/user-apartment-response.dto';

@Injectable()
export class AssignUserToApartmentUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    @Inject('ApartmentRepositoryInterface')
    private readonly apartmentRepository: ApartmentRepositoryInterface,
    @Inject('UserApartmentRepositoryInterface')
    private readonly userApartmentRepository: UserApartmentRepositoryInterface,
    private readonly findCategoryUserByNameUseCase: FindCategoryUserByNameUseCase,
  ) {}

  async execute(
    apartmentId: string,
    userId: string,
    categoryUserName: UserApartmentTypes,
  ): Promise<UserApartmentResponseDto> {
    const apartment = await this.apartmentRepository.findUnique({ conditions: { id: apartmentId } });
    if (!apartment) {
      throw new DomainException({ message: 'Apartment not found', statusCode: HttpStatus.NOT_FOUND });
    }

    const user = await this.userRepository.findUnique({ conditions: { id: userId } });
    if (!user) {
      throw new DomainException({ message: 'User not found', statusCode: HttpStatus.NOT_FOUND });
    }

    const categoryUser = await this.findCategoryUserByNameUseCase.execute(categoryUserName);
    if (!categoryUser) {
      throw new DomainException(`Category user ${categoryUserName} not found. Run seeds first.`);
    }

    const existing = await this.userApartmentRepository.findUnique({
      conditions: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        userId_apartmentId_categoryUserId: {
          userId,
          apartmentId,
          categoryUserId: categoryUser.id as string,
        },
      },
    });

    if (existing) {
      throw new DomainException({
        message: `User already has the ${categoryUserName} role in this apartment`,
        statusCode: HttpStatus.CONFLICT,
      });
    }

    const userApartment = await this.userApartmentRepository.create(
      new UserApartment({ userId, apartmentId, categoryUserId: categoryUser.id as string }),
    );

    return UserApartmentResponseDto.fromEntity(
      new UserApartment({
        id: userApartment.id,
        userId: userApartment.userId,
        apartmentId: userApartment.apartmentId,
        categoryUserId: userApartment.categoryUserId,
        categoryUserName,
      }),
    );
  }
}
