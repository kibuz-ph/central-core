import { ApiProperty } from '@nestjs/swagger';
import { UserRoleResponseDto } from '../../../user-role/application/dto/user-role-response.dto';

export class GetUserRolesResponseDto {
  @ApiProperty({
    type: [UserRoleResponseDto],
    description: "User's roles in the residential complex",
  })
  items: UserRoleResponseDto[];
}
