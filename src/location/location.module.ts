import { Module } from '@nestjs/common';
import { LocationController } from './controller/location/location.controller';
import { LocationService } from './service/location/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity'



@Module({
  imports :[TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService]
})
export class LocationModule {}
