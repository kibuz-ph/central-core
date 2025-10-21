import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsObject, IsString, ValidateNested } from 'class-validator';
import { UserDto } from '../../../user/application/dtos/user.dto';

export class SignInResponseDto {
  @ApiProperty({ type: UserDto, description: 'User data' })
  @ValidateNested()
  @Type(() => UserDto)
  @IsObject()
  user: UserDto;

  @ApiProperty({ example: 'token.generated.login', description: 'User token' })
  @IsString()
  token: string;

  @ApiProperty({ example: true, description: 'Is login valid' })
  @IsBoolean()
  success: boolean;
}
