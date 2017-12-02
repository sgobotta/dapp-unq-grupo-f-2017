import * as request from "request";

export class CuitValidator {

  private cuit: string;

  constructor(cuit: string) {
    this.cuit = cuit;
  }

  public requestValidation() {
    request('https://soa.afip.gob.ar/sr-padron/v2/persona/' + this.cuit, (err, res, body) => {
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