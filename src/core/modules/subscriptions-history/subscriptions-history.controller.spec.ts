import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsHistoryController } from './subscriptions-history.controller';

describe('SubscriptionsHistoryController', () => {
  let controller: SubscriptionsHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionsHistoryController],
    }).compile();

    controller = module.get<SubscriptionsHistoryController>(SubscriptionsHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
