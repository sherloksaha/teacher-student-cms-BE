// src/modules/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // 👈 Crucial: allows other modules to use this service
})
export class EmailModule {}
