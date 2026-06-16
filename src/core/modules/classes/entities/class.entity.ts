import { Subject } from 'src/core/modules/subjects/entities/subject.entity';
import { Student } from 'src/core/modules/users/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Teacher } from '../../users/entities/teacher.entity';


@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. "Class 9", "Class 10"

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => Subject, (subject) => subject.class)
  subjects: Subject[];

  @OneToMany(() => Teacher, (teacher) => teacher.class)
  teachers: Teacher[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
