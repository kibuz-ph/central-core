import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password123*',
    description: 'Phone of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}