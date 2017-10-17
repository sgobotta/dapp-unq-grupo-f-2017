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
  	if(this.validateCuit(cuit)){
  		this.cuit = cuit;
  	}
  	if(MailValidator.validateMail(email)){
      this.email = email;
    }
  	this.name = name;
  	this.surname = surname;
  	this.phone = phone;
  	this.address = address;
  }

  private validateCuit(cuit) {
  	// Service Unavailable 10/17/2017
  	request('https://soa.afip.gob.ar/sr-padron/v2/persona/' + cuit, function(err, res, body){
  		if(err){
        console.log(err)
  			return false;
  		}
  		if(res.body.success){
        this.validateCuitInformation(res.body.data)
  			return res;
  		}
  		else {
  			return false;
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

  constructor(){
    this.clear()
    return this;
  }

  private clear(){
    this.cuit = 0;
    this.name = "";
    this.surname = "";
    this.email = "";
    this.phone = new Phone("", 0);
    this.address = new Address("", 0, "", "", new MapsLocation(0,0));
  }

  public withCUIT(cuit:number){
    this.cuit = cuit;
    return this
  }

  public withName(name:string){
    this.name = name
    return this
  }

  public withSurname(surname:string){
    this.surname = surname
    return this
  }

  public withEmail(email:string){
    this.email = email
    return this
  }

  public withPhone(area:string, number:number){
    this.phone = new Phone(area, number)
    return this
  }

  public withAddress(street:string, number:number, city:string, state: string,
  latitude:number, longitude:number){
    this.address = new Address(street, number, city, state, new MapsLocation(latitude, longitude));
    return this
  }

  public build(){
    const customer = new Customer(this.cuit, this.name, this.surname, this.email, this.phone, this.address)
    this.clear()
    return customer
  }
}
