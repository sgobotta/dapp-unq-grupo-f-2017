import Address from "./utils/address";
import Phone from "./utils/phone";
import Availability from "./utils/availability";
import MapsPolygon from "./utils/maps/maps-polygon";
import {Reputation} from "./reputation";
import {MailValidator} from './utils/mailValidator'

export class Provider {

  name: string;
  logo: string;
  address: Address;
  description: string;
  website: string;
  email: string;
  phone: Phone;
  availability: Availability;
  deliveryLocationRange: MapsPolygon;
  reputation: Reputation;

  constructor(name:string, logo:string, address:Address, description:string, website:string, email:string, phone:Phone, availability:Availability, deliveryLocationRange: MapsPolygon, reputation:Reputation) {
    this.name = name;
    this.logo = logo;
    this.address = address;
    this.description = description;
    this.website = website;
    if(MailValidator.validateMail(email)){
      this.email = email;
    }
  }

  public rate(value:number) : void {
    this.reputation.rate(value);
  }
}

export class ProviderBuilder {

// To Do

}
