import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Student } from './student.entity';
import { Subject } from '../../subjects/entities/subject.entity';

@Entity('student_subjects')
export class StudentSubject {
  @PrimaryColumn()
  studentId: number;

  @PrimaryColumn()
  subjectId: number;

  @ManyToOne(() => Student, (student) => student.subjects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Subject, (subject) => subject.students, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
