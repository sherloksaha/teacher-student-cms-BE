import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';



@Injectable()
export class AdminSeed {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async run() {
    const existingAdmin =
      await this.userRepo.findOne({
        where: {
          email: 'admin@gmail.com',
        },
      });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const admin = this.userRepo.create({
      
    });

    await this.userRepo.save(admin);

    console.log('Admin created');
  }
}