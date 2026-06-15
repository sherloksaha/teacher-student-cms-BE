import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([State, City, Area])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
