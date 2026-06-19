import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventsService } from './user-events.service';
import { UserRegisteredListener } from './listners/user-registered-listners';
import { QueueModule } from '../queue/queue.module';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [EventEmitterModule.forRoot({
        global: true,
        wildcard: false,
        maxListeners: 20,
        verboseMemoryLeak: true
    }),
        QueueModule,
        EmailModule
    ],
    providers: [
        UserEventsService,
        UserRegisteredListener
    ],
    exports: [UserEventsService]
})
export class EventsModule { }
