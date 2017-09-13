export class Reputation {

	private averageRating:number;
	private quantity:number;

  constructor() {
    this.averageRating = null;
    this.quantity = null;
  }

  public rate(value) : void {
  	if(this.averageRating !== null){
  		this.quantity++;
  		this.averageRating = this.averageRating * ((this.quantity - 1) / this.quantity) + (value / this.quantity);
  	} else {
  		this.quantity = 1;
  		this.averageRating = value;
  	}
  }

  public getRating() : number {
  	return this.averageRating;
  }
}
