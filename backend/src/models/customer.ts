import Phone from "./utils/phone";
import Address from "./utils/address";

export class Customer {

  cuit: number;
  name: string;
  surname: string;
  email: string;
  phone: Phone;
  address: Address;

  constructor(cuit:number, name:string, surname:string, email:string, phone: Phone, address: Address) {
  	this.validateCuit(cuit);
  	this.validateEmail(email);
  	this.name = name;
  	this.surname = surname;
  	this.phone = phone;
  	this.address = address;
  }

  private validateCuit() {
  	// To Do with soa.afip.gob.ar/sr-padron/v2/persona/<cuit>
  }

  private validateEmail(email) {
  	// RegEx from http://emailregex.com/
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
}
