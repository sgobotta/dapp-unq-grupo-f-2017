import Address from "./utils/address";
import Phone from "./utils/phone";
import Availability from "./utils/availability";
import MapsPolygon from "./utils/maps/maps-polygon";
import { Reputation } from "./reputation";
import { MailValidator } from "./utils/mailValidator";
import MapsLocation from "./utils/maps/maps-location";

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

  constructor(name:string, logo:string, address:Address, description:string, website:string,
    email:string, phone:Phone, availability:Availability,
    deliveryLocationRange: MapsPolygon, reputation:Reputation) {

    this.name = name;
    this.logo = logo;
    this.address = address;
    this.description = description;
    this.website = website;
    if(MailValidator.validateMail(email)){
      this.email = email;
    } else {
      throw Error("ERROR ::: Provided e-mail is not valid.");
    }
    this.phone = phone;
    this.availability = availability;
    this.deliveryLocationRange = deliveryLocationRange;
    this.reputation = reputation;
  }

  public rate(value:number) : void {
    this.reputation.rate(value);
  }
}

export class ProviderBuilder {

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

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.name = "";
    this.logo = "";
    this.address = null;
    this.description = "";
    this.website = "";
    this.email = "";
    this.phone = null;
    this.availability = null;
    this.deliveryLocationRange = null;
    this.reputation = new Reputation();
  }

  public withName(name:string) {
    this.name = name;
    return this;
  }

  public withLogo(logo:string) {
    this.logo = logo;
    return this;
  }

  public withAddress(street:string, number:number, city:string, state: string, 
  latitude:number, longitude:number) {
    this.address = new Address(street, number, city, state, new MapsLocation(latitude, longitude));
    return this;
  }

  public withDescription(description:string) {
    this.description = description;
    return this;
  }

  public withWebsite(website:string) {
    this.website = website;
    return this;
  }

  public withEmail(email:string) {
    this.email = email;
    return this;
  }

  public withPhone(area:string, number:number) {
    this.phone = new Phone(area, number);
    return this;
  }

  public withAvailability(availability) {
    this.availability = new Availability(availability);
    return this;
  }

  public withDeliveryLocationRange(deliveryLocationRange: MapsLocation[]) {
    this.deliveryLocationRange = new MapsPolygon(deliveryLocationRange);
    return this;
  }

  public build() {
    const provider = new Provider(this.name, this.logo, this.address, this.description,
      this.website, this.email, this.phone, this.availability, this. deliveryLocationRange,
      this.reputation);
    this.clear();
    return provider;
  }

}
