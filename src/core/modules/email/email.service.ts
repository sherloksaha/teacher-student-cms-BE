// src/modules/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendWelcomeEmail(email: string, name: string): Promise<void> {
    this.logger.log(`Initiating HTTP API call to send welcome email to ${email}`);

    try {
      // Simulation of a network request to an email provider (e.g., Resend, SendGrid)
      await new Promise((resolve) => setTimeout(resolve, 1500)); 

      this.logger.log(`🎉 Successfully sent welcome email to ${email}`);
    } catch (error) {
      this.logger.error(`❌ Failed to send welcome email to ${email}`, error.stack);
      throw error; // Throwing the error tells BullMQ to retry the job automatically
    }
  }
}
