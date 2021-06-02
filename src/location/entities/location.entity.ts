import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  locationName: String;

  @Column()
  description: String;

  @Column()
  website: String;

  @Column()
  phone: String;

  @Column()
  contactPerson: String;

  @Column()
  latitude: String;

  @Column()
  longitude: String;


}