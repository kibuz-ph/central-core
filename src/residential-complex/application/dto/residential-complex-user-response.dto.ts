import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserDetailResponseDto } from '../../../user-details/application/dto/user-detail-response.dto';
import { ApartmentWithCategoriesDto } from './apartment-with-categories.dto';

export class ResidentialComplexUserResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  id: string;

  @ApiProperty({ example: 'john.doe', description: "User's username" })
  username: string;

  @ApiProperty({ example: 'john@example.com', description: "User's email" })
  email: string;

  @ApiProperty({ example: true, description: 'Whether the user is active' })
  isActive: boolean;

  @ApiPropertyOptional({ type: UserDetailResponseDto, description: "User's personal details" })
  userDetail?: UserDetailResponseDto;

  @ApiProperty({
    type: [ApartmentWithCategoriesDto],
    description: 'Apartments the user is assigned to within the complex',
  })
  apartments: ApartmentWithCategoriesDto[];
}
