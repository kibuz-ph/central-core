import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUserDetailDto } from './create-user-detail.dto';

export class UpdateUserDetailDto extends PartialType(CreateUserDetailDto) {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
