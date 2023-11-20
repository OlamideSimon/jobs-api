import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get<Role | Role[]>(
      'role',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    if (role && role === request.user?.role) return true;

    return false;
  }
}
