import { Module } from '@nestjs/common';
import { SubscriptionsHistoryController } from './subscriptions-history.controller';
import { SubscriptionsHistoryService } from './subscriptions-history.service';

@Module({
  controllers: [SubscriptionsHistoryController],
  providers: [SubscriptionsHistoryService]
})
export class SubscriptionsHistoryModule {}
