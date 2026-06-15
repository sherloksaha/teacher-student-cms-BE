import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Teacher } from 'src/core/modules/users/entities/teacher.entity';
import { Student } from 'src/core/modules/users/entities/student.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  zip: number

  @ManyToOne(() => City, (city) => city.areas, { onDelete: 'CASCADE' })
  city: City;

  @ManyToMany(() => Teacher, (teacher) => teacher.areas)
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.area)
  students: Student[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
