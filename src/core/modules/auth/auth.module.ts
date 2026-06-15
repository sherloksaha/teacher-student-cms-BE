import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/core/modules/users/users.module';
import { User } from 'src/core/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guard/jwt-aut.guard';
import { RoleGuard } from './guard/roles-gauards';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Student } from 'src/core/modules/users/entities/student.entity';
import { Teacher } from 'src/core/modules/users/entities/teacher.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, Student, Teacher]),
    // Import User entity for repository injection
    PassportModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtAuthGuard, RoleGuard, JwtStrategy],
  exports: [AuthService, RoleGuard]
})
export class AuthModule { }
