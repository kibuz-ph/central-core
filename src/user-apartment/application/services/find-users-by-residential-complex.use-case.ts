import { Inject, Injectable } from '@nestjs/common';
import { UserApartmentTypes } from '../../../category-user/domain/enums/user-apartment-type.enum';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { PaginationMetadata } from '../../../common/types/pagination-metadata';
import { ApartmentWithCategoriesDto } from '../../../residential-complex/application/dto/apartment-with-categories.dto';
import { ResidentialComplexUserResponseDto } from '../../../residential-complex/application/dto/residential-complex-user-response.dto';
import { UserDetailResponseDto } from '../../../user-details/application/dto/user-detail-response.dto';
import { UserApartment } from '../../domain/entities/user-apartment.entity';
import {
  ResidentialComplexUsersFilters,
  UserApartmentRepositoryInterface,
} from '../../domain/repositories/user-apartment.repository-interface';

@Injectable()
export class FindUsersByResidentialComplexUseCase {
  constructor(
    @Inject('UserApartmentRepositoryInterface')
    private readonly userApartmentRepository: UserApartmentRepositoryInterface,
  ) {}

  async execute(
    residentialComplexId: string,
    page: number,
    perPage: number,
    filters: ResidentialComplexUsersFilters = {},
  ): Promise<PaginatedResponseDto<ResidentialComplexUserResponseDto>> {
    const skip = (page - 1) * perPage;
    const where = this.buildWhere(residentialComplexId, filters);

    const [userApartments, totalUsers]: [UserApartment[], number] = await Promise.all([
      this.userApartmentRepository.findManyByResidentialComplex(where, skip, perPage),
      this.userApartmentRepository.countUsersByResidentialComplex(where),
    ]);

    const userMap = new Map<string, ResidentialComplexUserResponseDto>();
    const apartmentMap = new Map<string, Map<string, ApartmentWithCategoriesDto>>();

    for (const ua of userApartments) {
      const { userId, apartmentId, id, categoryUserName, user, apartment } = ua;

      if (!user || !apartment) continue;

      if (!userMap.has(userId)) {
        userMap.set(userId, {
          id: user.id as string,
          username: user.username,
          email: user.email,
          isActive: user.isActive,
          userDetail: user.userDetail
            ? UserDetailResponseDto.fromEntities(user.userDetail)
            : undefined,
          apartments: [],
        });
        apartmentMap.set(userId, new Map());
      }

      const aptMap = apartmentMap.get(userId)!;

      if (!aptMap.has(apartmentId)) {
        const aptDto: ApartmentWithCategoriesDto = {
          id: apartment.id as string,
          reference: apartment.reference,
          floor: apartment.floor,
          size: apartment.size,
          userCategories: [],
        };
        aptMap.set(apartmentId, aptDto);
        userMap.get(userId)!.apartments.push(aptDto);
      }

      aptMap.get(apartmentId)!.userCategories.push({
        id: id as string,
        categoryName: categoryUserName as UserApartmentTypes,
      });
    }

    const items = Array.from(userMap.values());
    const pagination = PaginationMetadata.create(page, perPage, totalUsers);

    return new PaginatedResponseDto(items, pagination);
  }

  private buildWhere(
    residentialComplexId: string,
    {
      email,
      name,
      apartmentReference,
      apartmentFloor,
      categoryName,
    }: ResidentialComplexUsersFilters,
  ) {
    return {
      apartment: {
        residentialComplexId,
        ...(apartmentReference && {
          reference: { contains: apartmentReference, mode: 'insensitive' },
        }),
        ...(apartmentFloor !== undefined && { floor: apartmentFloor }),
      },
      ...(categoryName && { categoryUser: { name: categoryName } }),
      user: {
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
        ...(name && {
          OR: [
            { userDetail: { firstName: { contains: name, mode: 'insensitive' } } },
            { userDetail: { lastName: { contains: name, mode: 'insensitive' } } },
          ],
        }),
      },
    };
  }
}
