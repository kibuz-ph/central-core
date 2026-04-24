import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginates-response.dto';
import { ResidentialComplexUserResponseDto } from './residential-complex-user-response.dto';

export class GetResidentialComplexUsersResponseDto extends PaginatedResponseDto<ResidentialComplexUserResponseDto> {
  @ApiProperty({
    type: [ResidentialComplexUserResponseDto],
    description: 'Users assigned to apartments in the residential complex',
  })
  declare items: ResidentialComplexUserResponseDto[];
}
