import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { StudentSubject } from 'src/core/modules/users/entities/student-subject.entity';
import { Teacher } from 'src/core/modules/users/entities/teacher.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. "Mathematics", "Physics"

  @Column()
  subjectCode: string;

  @ManyToOne(() => Class, (cls) => cls.subjects, { onDelete: 'CASCADE' })
  class: Class;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];

  @OneToMany(() => StudentSubject, (studentSubject) => studentSubject.subject)
  students: StudentSubject[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
