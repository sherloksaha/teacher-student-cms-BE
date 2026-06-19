import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PaymentStatusModule } from './core/modules/payment-status/payment-status.module';

import { SubscriptionsHistoryModule } from './core/modules/subscriptions-history/subscriptions-history.module';
import { SubscriptionsModule } from './core/modules/subscriptions/subscriptions.module';
import { UsersModule } from './core/modules/users/users.module';
import { LocationsModule } from './core/modules/locations/locations.module';

import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './core/modules/posts/posts.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './core/modules/users/entities/user.entity';
import { Teacher } from './core/modules/users/entities/teacher.entity';
import { Student } from './core/modules/users/entities/student.entity';
import { StudentSubject } from './core/modules/users/entities/student-subject.entity';
import { State } from './core/modules/locations/entities/state.entity';
import { City } from './core/modules/locations/entities/city.entity';
import { Area } from './core/modules/locations/entities/area.entity';
import { Class } from './core/modules/classes/entities/class.entity';
import { Subject } from './core/modules/subjects/entities/subject.entity';
import { Subscription } from './core/modules/subscriptions/entities/subscription.entity';
import { SubscriptionHistory } from './core/modules/subscriptions-history/entities/subscription-history.entity';
import { PostEntity } from './core/modules/posts/entities/posts.entities';
import { SubscriptionConfiguration } from './core/modules/subscriptions/entities/subscription-configuration.entity';
import { AuthModule } from './core/modules/auth/auth.module';
import { ClassesModule } from './core/modules/classes/classes.module';
import { SubjectsModule } from './core/modules/subjects/subjects.module';
import { StudentSubjectsModule } from './core/modules/student-subjects/student-subjects.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventsModule } from './core/modules/events/events.module';
import { QueueModule } from './core/modules/queue/queue.module';
import { EmailModule } from './core/modules/email/email.module';
import { SeedModule } from './core/modules/auth/seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // validationSchema:joi.object({
      //   APP_NAME: joi.string().default('My_App')
      // })
      load: [appConfig],
    }),
    ThrottlerModule.forRoot([
      { ttl: 60000, limit: 10 }
    ]),
    //  TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // Pass your connection link directly here
    //   url: 'postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/mydatabase',
    //   entities: [],
    //   synchronize: true, // Automatically syncs database schema with your entity code
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '12345',
      database: process.env.DB_NAME || 'postgresproj1',
      entities: [
        User,
        Teacher,
        Student,
        StudentSubject,
        State,
        City,
        Area,
        Class,
        Subject,
        Subscription,
        SubscriptionHistory,
        PostEntity,
        SubscriptionConfiguration,

      ],
      synchronize: true, // Automatically syncs database schema with code (Disable in production!)
    }),
    LocationsModule,
    UsersModule,
    SubscriptionsModule,
    SubscriptionsHistoryModule,
    PaymentStatusModule,
    PostsModule,
    AuthModule,
    ClassesModule,
    SubjectsModule,
    StudentSubjectsModule,
    EventsModule,
    QueueModule,
    EmailModule,
    SeedModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
