/**
* This controller is responsible for handling location specific routes
* It handles the following routes
* @author  Enokela Acheme Paul
* @email    achemepaulenokela@gmail.com
* @version 1.0
*/

import { Controller, Get, Post, Put, Patch, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { LocationService } from '../../service/location/location.service';
import { LocationDto } from '../../dto/location.dto';

@Controller('location')
export class LocationController {

    constructor(private locationService: LocationService) {

    }

     /*View all locations
    */
    @Get()
    async findAll() : Promise<LocationDto[]> {
        return await this.locationService.findAll();
    }

     /*Get a particular location
    * @param id - This is the location id.
    */
    @Get(':id')
    async findOne(@Param() id : number) : Promise<LocationDto> {
        return await this.locationService.findOne(id);
    }

     /*Create a new location
    */
    @Post()
    async create(@Body() locationDto: LocationDto) : Promise<LocationDto> {

        //check if location was already created, if not create it or just return the existing location
        const existingLocation = await this.locationService.findLocationByLatAndLng(locationDto.latitude, locationDto.longitude);
        if (existingLocation) {
            console.log("location already exists");
            return existingLocation;
          
        }
        return this.locationService.create(locationDto);
    }


     /*Delete a location
    * @param id - This is the location id
    */
    @Delete(':id')
    remove(@Param() id: number) : boolean {
        return this.locationService.deleteLocation(id);
    }


     /*Update a location
    * @param location - This is the location object
    */
    @Patch()
    async update(@Body() location: any) : Promise<LocationDto> {
         return await this.locationService.updateLocation(location.id, location);
    }


     /*Calculate the distance between two locations
    * @param id1 - This is the id of the first location
    * @param id2 - This is the id of the second location
    */
    @Get('/distance/:id1/:id2')
    async distance(@Param() params : any) : Promise<any> {
        
        const location1 = await this.locationService.findOne(params.id1);
        const location2 = await this.locationService.findOne(params.id2);

       if (!location1 || !location2) {
        throw new BadRequestException('One or both locations not found');
       }

        const distance = haversineDistance(location1.latitude, location1.longitude, location2.latitude, location2.longitude);
        return distance;
    }

   

}


//we use the haversine Algorithm to calculate the distance between the two locations
const haversineDistance = (lat1, lon1, lat2, lon2) => {
   
    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);

    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  

    return finalDistance;

  };
