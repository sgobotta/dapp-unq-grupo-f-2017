import Address from "./utils/address";
import Phone from "./utils/phone";
import Availability from "./utils/availability";
import MapsPolygon from "./utils/maps/maps-polygon";
import Reputation from "./reputation";

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

  constructor() {

  }
}
