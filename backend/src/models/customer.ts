import Phone from "./utils/phone";
import Address from "./utils/address";
import * as request from "request";
import { MailValidator } from "./utils/mailValidator";
import MapsLocation from "./utils/maps/maps-location";

export class Customer {

  cuit: number;
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  address: Address;

  constructor(cuit:number, name:string, surname:string, email:string, phone: Phone, address: Address) {
  	if (this.validateCuit(cuit)) {
  		this.cuit = cuit;
  	}
    this.email = this.validateEmail(email);
  	this.name = name;
  	this.surname = surname;
  	this.phone = phone;
  	this.address = address;
  }

  private validateEmail(email) {
    try {
      if (MailValidator.validate(email)) {
        return email;
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  private validateCuit(cuit) {
  	request('https://soa.afip.gob.ar/sr-padron/v2/persona/' + cuit, (err, res, body) => {
  		if (err) {
  			throw Error("ERROR ::: Connection could't be established");
  		}
      let success = JSON.parse(res.body).success;
  		if (success) {
  			return body.estadoClave === "ACTIVO";
  		}
  		else {
  			throw Error("ERROR ::: CUIT provided seems to be invalid");
  		}
  	});
  }
}


export class CustomerBuilder {

  cuit: number;
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  address: Address;

  constructor() {
    this.clear();
    return this;
  }

  private clear() {
    this.cuit = 0;
    this.name = "";
    this.surname = "";
    this.email = "";
    this.phone = new Phone("", 0);
    this.address = new Address("", 0, "", "", new MapsLocation(0,0));
  }

  public withCUIT(cuit:number) {
    this.cuit = cuit;
    return this;
  }

  public withName(name:string) {
    this.name = name;
    return this;
  }

  public withSurname(surname:string) {
    this.surname = surname;
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

  public withAddress(street:string, number:number, city:string, state: string,
  latitude:number, longitude:number) {
    this.address = new Address(street, number, city, state, new MapsLocation(latitude, longitude));
    return this;
  }

  public build() {
    const customer = new Customer(this.cuit, this.name, this.surname, this.email, this.phone, this.address);
    this.clear();
    return customer;
  }
}
