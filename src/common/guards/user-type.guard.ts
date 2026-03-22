import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserProps } from '../../users/domain/entities/user.entity';
import { UserTypes } from '../../users/domain/enums/user-types.enum';
import { IS_PUBLIC_KEY } from '../decorators/make-me-public.decorator';

export const USER_TYPE_KEY = 'userTypes';
export const RequiredUserTypes = (...types: UserTypes[]) => SetMetadata(USER_TYPE_KEY, types);

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const requiredTypes = this.reflector.get<UserTypes[]>(USER_TYPE_KEY, context.getHandler());
    if (!requiredTypes) return true;

    const { user } = context
      .switchToHttp()
      .getRequest<Request & { user: Omit<UserProps, 'password'> & { id: string } }>();
    if (!user || !requiredTypes.includes(user.type as UserTypes)) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
