import { Inject, Injectable } from '@nestjs/common';
import { DomainException } from '../../../../modules/pino/domain/exceptions/domain.exception';
import { rolesName } from '../../../user/domain/entities/enums/roles.enum';
import { User } from '../../../user/domain/entities/user.entity';
import { UserRepositoryInterface } from '../../../user/domain/repositories/user.repository-interface';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class SignupUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(singupDto: SignupDto): Promise<User> {
    const existingEmail = await this.userRepository.findByEmail(singupDto.email);
    if (existingEmail) {
      throw new DomainException(`User with email: ${singupDto.email} already exits`);
    }

    const user = new User({
      ...singupDto,
      isActive: true,
      role: rolesName.USER,
    });
    await user.setPassword(singupDto.password);
    const userCreated = await this.userRepository.create(user);
    return userCreated;
  }
}
