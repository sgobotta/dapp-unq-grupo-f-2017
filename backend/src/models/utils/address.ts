import MapsLocation from "./maps/maps-location";

export default class Address {

  street: string;
  number: number;
  city: string;
  state: string;
  mapsLocation: MapsLocation;

  constructor(street:string, number: number, city:string, state:string, mapsLocation: MapsLocation) {
    this.street = street;
    this.number = number;
    this.city = city;
    this.state = state;
    this.mapsLocation = mapsLocation;
  }
}
