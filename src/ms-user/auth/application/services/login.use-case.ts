import { HttpStatus, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { DomainException } from "../../../../modules/pino/domain/exceptions/domain.exception";
import { UserRepositoryInterface } from "../../../user/domain/repositories/user.repository-interface";
import { LoginDto } from "../../infrastructure/http/dto/login.dto";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

export class LoginUseCase {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
        private readonly jwtService: JwtService,
    ) {}

  async login(loginDto: LoginDto) {
    const {email, password} = loginDto;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new DomainException({message: `Credentials are not valid`, statusCode: HttpStatus.UNAUTHORIZED});
    }

    if (!bcrypt.compareSync(password, user.getPassword()))
      throw new DomainException({message: `Credentials are not valid`, statusCode: HttpStatus.UNAUTHORIZED});

    return {
      id: user.id,
      email: user.email,
      token: this.getJwtToken({id: user.id ?? ''})
    };
  }

  private getJwtToken(payload: JwtPayload) {

    const token = this.jwtService.sign(payload);
    return token;
  }
}