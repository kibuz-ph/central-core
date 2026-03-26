import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { UserProps } from '../../users/domain/entities/user.entity';

export const COMPLEX_ROLE_KEY = 'complexRoles';
export const RequiredComplexRoles = (...roles: UserRoleTypes[]) =>
  SetMetadata(COMPLEX_ROLE_KEY, roles);

@Injectable()
export class ComplexRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRoleTypes[]>(
      COMPLEX_ROLE_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<
      Request<{ id: string; residentialComplexId: string }> & {
        user: Omit<UserProps, 'password'> & { id: string };
      }
    >();

    const { user, params } = request;
    const residentialComplexId = params.residentialComplexId ?? params.id;

    if (!user || !residentialComplexId) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    const userRole = await this.prisma.userRole.findFirst({
      where: {
        userId: user.id,
        residentialComplexId,
        role: { name: { in: requiredRoles } },
      },
    });

    if (!userRole) {
      throw new ForbiddenException('Access denied: insufficient permissions');
    }

    return true;
  }
}
