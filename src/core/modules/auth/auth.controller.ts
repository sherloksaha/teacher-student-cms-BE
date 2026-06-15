import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { UpdateUserDto } from 'src/core/modules/users/dto/update-user-dto';
import { JwtAuthGuard } from './guard/jwt-aut.guard';
import { Roles } from './decorators/roles.decorators';
import { UserRole } from './constant';
import { CurrentUser } from './decorators/cuurent-user.decorator';
import { RoleGuard } from './guard/roles-gauards';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData)
    }

    @Post('login')
    login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }

    @Put(':id')
    updateStaus(@Param('id') id: number, @Body() updateUserData: UpdateUserDto) {
        return this.authService.upDateUser(id, updateUserData)
    }

    @Get('current-user')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(UserRole.STUDENT, UserRole.TEACHER, UserRole.SUPER_ADMIN)
    getCurrentUser(@CurrentUser() user: any) {
        return user;
    }

    @Post('create-admin-user')
    @Roles(UserRole.SUPER_ADMIN)
    @UseGuards(JwtAuthGuard, RoleGuard)
    createAdminUser(@Body() createAdminUserData: RegisterDto) {
        return this.authService.createAdminUser(createAdminUserData);
    }

}
