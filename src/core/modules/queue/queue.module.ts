// src/modules/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import { EMAIL_QUEUE } from './constants/queue.constant';
import { EmailProcessor } from './processor/email.processor';
import { EmailModule } from '../email/email.module';


@Module({
    imports: [
        // Register the specific email queue
        BullModule.registerQueue({
            name: EMAIL_QUEUE,
        }),
        EmailModule, // Import EmailModule so the processor can use its service
    ],
    providers: [QueueService, EmailProcessor],
    exports: [QueueService], // Export QueueService so AuthModule can use it
})
export class QueueModule { }
