import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRoleType } from '../../domain/entities/role.entity';
import { Role } from '../../domain/entities/role.entity';

export class RoleResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "Role's unique ID" })
  @IsString()
  id?: string;

  @ApiProperty({ enum: UserRoleType, example: UserRoleType.USER, description: "Role's name" })
  @IsEnum(UserRoleType)
  name: UserRoleType;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
  }

  static fromEntity(role: Role): RoleResponseDto {
    return new RoleResponseDto(role);
  }
}
