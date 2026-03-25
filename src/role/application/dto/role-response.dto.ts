import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Role } from '../../domain/entities/role.entity';
import { userRoleTypes, UserRoleTypes } from '../../domain/enums/user-role-types.enum';

export class RoleResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "Role's unique ID" })
  @IsString()
  id?: string;

  @ApiProperty({ enum: userRoleTypes, example: userRoleTypes.USER, description: "Role's name" })
  @IsEnum(userRoleTypes)
  name: UserRoleTypes;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
  }

  static fromEntity(role: Role): RoleResponseDto {
    return new RoleResponseDto(role);
  }
}
