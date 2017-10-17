import Phone from "./utils/phone";
import Address from "./utils/address";
import request from 'request';
import {MailValidator} from './utils/mailValidator'

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
  	// Should work, testing To-DO
  	request('http://soa.afip.gob.ar/sr-padron/v2/persona/' + cuit, function(err, res, body){
  		if(err){
  			return false;
  		}
  		if(res){
  			return res.success;
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
  }

  private clear(){
    this.cuit = 0
    this.name = ""
    this.surname = ""
    this.email = ""
    this.phone = new Phone("", 0)
    this.address = new Address()
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

  public withAddress(address:Address){
    this.address = address
    return this
  }

  public build(){
    const customer = new Customer(this.cuit, this.name, this.surname, this.email, this.phone, this.address)
    this.clear()
    return customer
  }
}