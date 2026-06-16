import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionConfigurationDto } from './dto/create-subscription-configuration.dto';
import { UpdateSubscriptionConfigurationDto } from './dto/update-subscription-configuration.dto';
import { SubscriptionConfiguration } from './entities/subscription-configuration.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-aut.guard';
import { UserRole } from '../auth/constant';
import { Roles } from '../auth/decorators/roles.decorators';
import { RoleGuard } from '../auth/guard/roles-gauards';

@Controller('subscriptions')
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRole.SUPER_ADMIN)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) { }

  @Post('configuration')

  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createConfiguration(
    @Body() createDto: CreateSubscriptionConfigurationDto,
  ): Promise<SubscriptionConfiguration> {
    return this.subscriptionsService.createConfiguration(createDto);
  }

  @Put('configuration/:id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  updateConfiguration(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateSubscriptionConfigurationDto,
  ): Promise<SubscriptionConfiguration> {
    return this.subscriptionsService.updateConfiguration(id, updateDto);
  }
}
