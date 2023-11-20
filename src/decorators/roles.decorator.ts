import { SetMetadata } from '@nestjs/common';
import { Role as RoleType } from '../types/index';

export const Role = (role: RoleType[] | RoleType) => SetMetadata('role', role);
