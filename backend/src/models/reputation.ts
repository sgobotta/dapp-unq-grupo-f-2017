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
  		this.averageRating = this.calculateRating(value);
  	} else {
  		this.quantity = 1;
  		this.averageRating = value;
  	}
  }

	private calculateRating(value): number {
		return this.averageRating * ((this.quantity - 1) / this.quantity) + (value / this.quantity);
	}

  public getRating() : number {
  	return this.averageRating;
  }
}
