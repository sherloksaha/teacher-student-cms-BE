import { Controller, Get, Param, ParseEnumPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { RoleGuard } from '../auth/guard/roles-gauards';

@Controller('users')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRole.SUPER_ADMIN)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('role/:role')
    async findByRole(@Param('role', new ParseEnumPipe(UserRole)) role: UserRole): Promise<User[]> {
        return this.usersService.findByRole(role);
    }
}
