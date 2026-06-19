import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { AdminSeed } from './seed.admin';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AdminSeed],
  exports: [AdminSeed],
})
export class SeedModule {}