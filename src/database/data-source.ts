import { DataSource } from 'typeorm';
import { User } from '../core/modules/users/entities/user.entity';
import { Teacher } from '../core/modules/users/entities/teacher.entity';
import { Student } from '../core/modules/users/entities/student.entity';
import { StudentSubject } from '../core/modules/users/entities/student-subject.entity';
import { State } from '../core/modules/locations/entities/state.entity';
import { City } from '../core/modules/locations/entities/city.entity';
import { Area } from '../core/modules/locations/entities/area.entity';
import { Class } from '../core/modules/classes/entities/class.entity';
import { Subject } from '../core/modules/subjects/entities/subject.entity';
import { Subscription } from '../core/modules/subscriptions/entities/subscription.entity';
import { SubscriptionHistory } from '../core/modules/subscriptions-history/entities/subscription-history.entity';
import { PostEntity } from '../core/modules/posts/entities/posts.entities';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
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
  ],
  synchronize: false,
});
