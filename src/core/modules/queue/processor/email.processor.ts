// src/modules/queue/processors/email.processor.ts
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { EMAIL_JOBS, EMAIL_QUEUE } from '../constants/queue.constant';
import { EmailService } from '../../email/email.service';

@Processor(EMAIL_QUEUE)
export class EmailProcessor extends WorkerHost {
    private readonly logger = new Logger(EmailProcessor.name);

    constructor(private readonly emailService: EmailService) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing job ${job.id} of type ${job.name}`);

        switch (job.name) {
            case EMAIL_JOBS.WELCOME_EMAIL: {
                const { email, name } = job.data;
                await this.emailService.sendWelcomeEmail(email, name);
                break;
            }
            default:
                this.logger.warn(`Unknown job type: ${job.name}`);
        }
    }
}
