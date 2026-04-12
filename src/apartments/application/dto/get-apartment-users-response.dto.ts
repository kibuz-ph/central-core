import { ApiProperty } from '@nestjs/swagger';
import { UserApartmentResponseDto } from '../../../user-apartment/application/dto/user-apartment-response.dto';

export class GetApartmentUsersResponseDto {
  @ApiProperty({ type: [UserApartmentResponseDto], description: "Apartment's users" })
  items: UserApartmentResponseDto[];
}
