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