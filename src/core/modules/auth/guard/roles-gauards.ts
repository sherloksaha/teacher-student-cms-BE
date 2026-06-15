import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY, UserRole } from "../constant";



@Injectable()

export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {
        // Reflecter ---> utility helps to access metadata
    }
    canActivate(context: ExecutionContext): boolean {
        // retrives the role metadata set by the role decorator
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY,
            [
                context.getHandler(), //method level metadata
                context.getClass(), //class level metadata
            ]
        );
        
  
        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest(); //this user object is attached by jwt auth guard 
    
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }
        const userRole = user.role;
        if (requiredRoles.includes(userRole)) {
            return true;
        }
        else {
            throw new ForbiddenException('User is not authorized to access this resource');
        }


    }

}