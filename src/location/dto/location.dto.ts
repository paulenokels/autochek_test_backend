import {  IsNotEmpty, } from 'class-validator';

export class LocationDto {

    // @IsNumber()
    // id:Number;

    @IsNotEmpty()
    locationName:String;

    @IsNotEmpty()
    description: String;

    @IsNotEmpty()
    website: String;

    @IsNotEmpty()
    phone: String;

    @IsNotEmpty()
    contactPerson: String;

    @IsNotEmpty()
    latitude: String;

    @IsNotEmpty()
    longitude: String;
}
