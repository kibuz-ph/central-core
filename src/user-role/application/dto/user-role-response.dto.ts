import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRole } from '../../domain/entities/user-role.entity';

export class UserRoleResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: 'Unique ID' })
  @IsString()
  id?: string;

  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's ID" })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "Role's ID" })
  @IsString()
  roleId: string;

  @ApiProperty({
    example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f',
    description: "Residential complex's ID",
  })
  @IsString()
  residentialComplexId: string;

  constructor(userRole: UserRole) {
    this.id = userRole.id;
    this.userId = userRole.userId;
    this.roleId = userRole.roleId;
    this.residentialComplexId = userRole.residentialComplexId;
  }

  static fromEntity(userRole: UserRole): UserRoleResponseDto {
    return new UserRoleResponseDto(userRole);
  }
}
