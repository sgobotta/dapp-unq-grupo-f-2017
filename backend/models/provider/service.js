

/**
* @param {string} name
* @param {string} email
* @param {string} logoUrl
* @param {ProviderAddress} address
* @param {string} description
* @param {Phone} phone
* @param {ProviderAvailability} availability
* @param {DeliveryDetails} deliveryDetails // Dirección de entrega? Es un delivery.
*/

export class ProviderService {

  constructor(name, email, logoUrl, address, description, phone, availability) {

    this.name            = name;
    this.email           = email,
    this.logoUrl         = logoUrl;
    this.address         = address;
    this.description     = description;
    this.phone           = phone;
    this.availability    = availability;
  }
}
