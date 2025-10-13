import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleNamesTypes, rolesName } from '../../../../user/domain/entities/enums/roles.enum';

export class TokenPayloadDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'User ID' })
  id: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'USER', description: 'User Role', enum: rolesName })
  @IsEnum(rolesName)
  roleName: RoleNamesTypes;
}
