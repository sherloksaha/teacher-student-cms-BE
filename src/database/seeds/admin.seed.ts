import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/modules/users/entities/user.entity';
import { UserRole } from 'src/core/modules/auth/constant';


export async function seedAdmin(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);

  const existingAdmin = await userRepository.findOne({
    where: { email: 'admin@gmail.com' },
  });

  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash('Admin@1234', 10);

  await userRepository.save({
    email: 'admin@gmail.com',
    password: hashedPassword,
    role: UserRole.SUPER_ADMIN,
    phone: '9954897045',
    firstName: 'Super',
    lastName: 'Admin',
  });

  console.log('Admin created');
}