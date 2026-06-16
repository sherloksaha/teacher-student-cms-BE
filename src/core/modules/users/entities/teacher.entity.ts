import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Area } from '../../locations/entities/area.entity';
import { Subject } from '../../subjects/entities/subject.entity';
import { SubscriptionHistory } from '../../subscriptions-history/entities/subscription-history.entity';
import { Class } from '../../classes/entities/class.entity';
export enum govtId {
  Adhaar = 'adhaar',
  Pan = 'pan',
}

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uniqueId: string;

  @Column({
    type: 'enum',
    enum: govtId,
    default: govtId.Adhaar,
  })
  govtId: string

  @OneToOne(() => User, (user) => user.teacher, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  bio: string;

  @ManyToMany(() => Area, (area) => area.teachers)
  @JoinTable({
    name: 'teacher_areas',
    joinColumn: { name: 'teacherId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'areaId', referencedColumnName: 'id' },
  })
  areas: Area[];

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @JoinTable({
    name: 'teacher_subjects',
    joinColumn: { name: 'teacherId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subjectId', referencedColumnName: 'id' },
  })
  subjects: Subject[];

  @OneToMany(() => SubscriptionHistory, (history) => history.teacher)
  subscriptionHistories: SubscriptionHistory[];

  @ManyToOne(() => Class, (cls) => cls.teachers, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'classId' })
  class: Class;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
