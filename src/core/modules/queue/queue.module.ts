// src/modules/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueService } from './queue.service';
import dotenv from 'dotenv'
import { EMAIL_QUEUE } from './constants/queue.constant';
import { EmailProcessor } from './processor/email.processor';
import { EmailModule } from '../email/email.module';
dotenv.config()


@Module({
    imports: [
        // Global configuration for Redis connection
        BullModule.forRoot({
            connection: {
                host: process.env.REDIS_HOST || 'localhost',
                port: parseInt(process.env.REDIS_PORT!, 10)
            },
        }),
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
