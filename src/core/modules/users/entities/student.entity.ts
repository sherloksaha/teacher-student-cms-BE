import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Class } from '../../classes/entities/class.entity';
import { Area } from '../../locations/entities/area.entity';
import { StudentSubject } from './student-subject.entity';
import { SubscriptionHistory } from '../../subscriptions-history/entities/subscription-history.entity';
// import { StudentSubject } from './student-subject.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;


  @OneToOne(() => User, (user) => user.student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'classId' })
  class: Class;

  @ManyToOne(() => Area, (area) => area.students, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'areaId' })
  area: Area;

  @OneToMany(() => StudentSubject, (studentSubject) => studentSubject.student)
  subjects: StudentSubject[];

  @OneToMany(
    () => SubscriptionHistory,
    (history) => history.student,
  )
  subscriptionHistories: SubscriptionHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
