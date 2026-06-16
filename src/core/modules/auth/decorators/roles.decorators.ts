import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY, UserRole } from "../constant";


// Mark the routes with necessary roles which will check by the role guard

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles); 