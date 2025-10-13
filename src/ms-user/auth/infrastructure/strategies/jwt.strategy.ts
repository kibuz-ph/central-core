import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DomainException } from "../../../../modules/pino/domain/exceptions/domain.exception";
import { User } from "../../../user/domain/entities/user.entity";
import { UserRepositoryInterface } from "../../../user/domain/repositories/user.repository-interface";
import { JwtPayload } from "../../application/interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepositoryInterface,
        configService: ConfigService,
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET') as string,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        
        const {id} = payload;

        const user = await this.userRepository.findById(id);

        if (!user)
            throw new DomainException({message: `Token not valid`, statusCode: HttpStatus.UNAUTHORIZED});

        if (!user.isActive)
            throw new DomainException({message: `User is inactive, talk with an admin`, statusCode: HttpStatus.UNAUTHORIZED});

        return user;
    }
}