import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from './subscription.entity';

@Entity('subscription_configurations')
export class SubscriptionConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Subscription, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscriptionId' })
  subscription: Subscription;

  @Column()
  subscriptionId: number;

  @Column()
  maxTeachers: number;

  @Column()
  maxSubjects: number;

  @Column({ default: false })
  freeConsultation: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
