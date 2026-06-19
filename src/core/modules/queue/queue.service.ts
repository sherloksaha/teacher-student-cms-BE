// src/modules/queue/queue.service.ts
import { Injectable, Logger, Module } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EMAIL_JOBS, EMAIL_QUEUE } from './constants/queue.constant';

@Module({})
export class QueueService {
    private readonly logger = new Logger(QueueService.name);

    constructor(
        @InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue,
    ) { }

    async addWelcomeEmailJob(email: string, name: string): Promise<void> {
        this.logger.log(`Enqueuing welcome email job for: ${email}`);

        await this.emailQueue.add(
            EMAIL_JOBS.ACTICATE_REQUEST,
            { email, name },
            {
                attempts: 3, // Retry 3 times if it fails
                backoff: {
                    type: 'exponential',
                    delay: 5000, // Wait 5s, then 10s, then 20s
                },
                removeOnComplete: true, // Clean up successful jobs automatically
            },
        );
    }
}
