import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SubscriptionHistory } from '../../subscriptions-history/entities/subscription-history.entity';
import { SubscriptionConfiguration } from './subscription-configuration.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. "Premium", "Basic"

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  durationDays: number; // e.g. 30, 90, 365

  // @OneToMany(() => SubscriptionHistory, (history) => history.subscription)
  // histories: SubscriptionHistory[];

  @OneToOne(() => SubscriptionConfiguration, (config) => config.subscription)
  configuration: SubscriptionConfiguration;

  @OneToMany(
    () => SubscriptionHistory,
    (history) => history.subscription,
  )
  histories: SubscriptionHistory[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
