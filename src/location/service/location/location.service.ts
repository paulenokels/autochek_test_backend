/**
* This Service is responsible for communicating and manipulating the databse
* It couples the DTO and the Entity
* @author  Enokela Acheme Paul
* @email    achemepaulenokela@gmail.com
* @version 1.0
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationDto } from '../../dto/location.dto'
import { Location } from '../../entities/location.entity'

@Injectable()
export class LocationService {

    public locations : LocationDto[];

    constructor(@InjectRepository(Location) private locationRepository : Repository<Location>) {}

    create(locationDto: LocationDto) : LocationDto {
        this.locationRepository.save(locationDto);
        return locationDto;
    }

     findAll() : Promise<LocationDto[]> {
        return this.locationRepository.find();
    }

     findOne(id: number) : Promise<LocationDto> {
        return  this.locationRepository.findOne(id);
    }

    findLocationByLatAndLng (lat : String, lng : String) : Promise<LocationDto> {
        return this.locationRepository.findOne({latitude: lat, longitude: lng});
       
    }

    updateLocation(id: number, locationDto: LocationDto) : Promise<LocationDto> {
         this.locationRepository.update(id, locationDto);
         return this.findOne(id);
    }

    deleteLocation(id:number) : boolean {
         this.locationRepository.delete(id);
        return true
    }
    

}
