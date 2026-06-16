import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Teacher } from '../../users/entities/teacher.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Student } from '../../users/entities/student.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
}

@Entity('subscription_histories')
export class SubscriptionHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Student,
    (student) => student.subscriptionHistories,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Teacher, (teacher) => teacher.subscriptionHistories, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  // @ManyToOne(() => Subscription, (sub) => sub.histories, { onDelete: 'RESTRICT' })
  // @JoinColumn({ name: 'subscriptionId' })
  // subscription: Subscription;


  @ManyToOne(
    () => Subscription,
    (subscription) => subscription.histories, { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

  @CreateDateColumn()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;


  @UpdateDateColumn()
  updatedAt: Date;
}
