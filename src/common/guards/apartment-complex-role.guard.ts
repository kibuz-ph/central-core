import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRoleTypes } from '../../role/domain/enums/user-role-types.enum';
import { UserProps } from '../../users/domain/entities/user.entity';
import { COMPLEX_ROLE_KEY } from './complex-role.guard';

@Injectable()
export class ApartmentComplexRoleGuard implements CanActivate {
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
      Request<{ id: string }> & {
        user: Omit<UserProps, 'password'> & { id: string };
      }
    >();

    const { user, params } = request;

    const apartment = await this.prisma.apartment.findUnique({
      where: { id: params.id },
      select: { residentialComplexId: true },
    });

    const residentialComplexId = apartment?.residentialComplexId;

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
