import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';
export const ROLES = (...roles : string[]) => SetMetadata(ROLES_KEY, roles); // ... is used to pass multiple roles as argument and it will return an array os roles
