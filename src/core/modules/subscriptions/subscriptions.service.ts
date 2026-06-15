import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionConfiguration } from './entities/subscription-configuration.entity';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionConfigurationDto } from './dto/create-subscription-configuration.dto';
import { UpdateSubscriptionConfigurationDto } from './dto/update-subscription-configuration.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionConfiguration)
    private readonly configRepository: Repository<SubscriptionConfiguration>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async createConfiguration(dto: CreateSubscriptionConfigurationDto): Promise<SubscriptionConfiguration> {
    // Check if subscription exists
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: dto.subscriptionId },
    });
    if (!subscription) {
      throw new NotFoundException(`Subscription with ID ${dto.subscriptionId} not found`);
    }

    // Check if configuration already exists for this subscription
    const existingConfig = await this.configRepository.findOne({
      where: { subscriptionId: dto.subscriptionId },
    });
    if (existingConfig) {
      throw new ConflictException(`Configuration already exists for subscription ID ${dto.subscriptionId}`);
    }

    const config = this.configRepository.create(dto);
    return this.configRepository.save(config);
  }

  async updateConfiguration(
    id: number,
    dto: UpdateSubscriptionConfigurationDto,
  ): Promise<SubscriptionConfiguration> {
    const config = await this.configRepository.findOne({
      where: { id },
      relations: { subscription: true },
    });
    if (!config) {
      throw new NotFoundException(`Subscription configuration with ID ${id} not found`);
    }

    Object.assign(config, dto);
    return this.configRepository.save(config);
  }
}
