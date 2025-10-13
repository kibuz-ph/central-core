import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { normalizeEmailTransform } from '../../../../../common/utils/email-normalization.util';

export class SignInResponseDto {
  @ApiProperty({ example: 'fb160441-660f-4e4d-af0b-b65d1a368b6f', description: "User's unique ID" })
  id: string;

  @ApiProperty({ example: 'jhon.doe@email.com', description: 'User email' })
  @Transform(({ value }) => normalizeEmailTransform(value))
  email: string;

  @ApiProperty({ example: 'token.generated.login', description: 'User token' })
  @IsString()
  token: string;

  @ApiProperty({ example: true, description: 'Is login valid' })
  @IsBoolean()
  success: boolean;
}
