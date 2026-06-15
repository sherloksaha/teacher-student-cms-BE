import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

export enum UserRole {
  SUPER_ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 30 })
  email: string;

  @Column({ length: 100 })
  password?: string; // Optional if you have social auth later

  @Column({ length: 15 })
  firstName: string;

  @Column({ length: 15 })
  lastName: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Teacher, (teacher) => teacher.user)
  teacher?: Teacher;

  @OneToOne(() => Student, (student) => student.user)
  student?: Student;
}
