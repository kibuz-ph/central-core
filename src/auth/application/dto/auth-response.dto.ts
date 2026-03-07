import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsObject, ValidateNested } from 'class-validator';
import { UserDto } from '../../../users/application/dto/user.dto';

export class AuthResponseDto {
  @ApiProperty({ type: UserDto, description: 'User data' })
  @ValidateNested()
  @Type(() => UserDto)
  @IsObject()
  user: UserDto;

  @ApiProperty({ example: true, description: 'Is login valid' })
  @IsBoolean()
  success: boolean;
}
