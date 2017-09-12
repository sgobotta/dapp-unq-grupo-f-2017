

export default class Currency {

  name: string;
  // conversionRate: number; Check if this is needed and how to implement it
  symbol: string;
  amount: number;


  constructor(){

  }

  public substract(amount: Currency){
  	// Simple implementation with no conversion rate
  	if(this.amount - amount.getAmount() > 0){
  		this.amount = this.amount - amount.getAmount();
  	} else {
  		// throw error maybe
  		console.log("Pibe no te alcanza pa' garpar");
  	}

  }

  public add(amount: Currency){
  	// Simple implementation with no conversion rate
  	this.amount = this.amount + amount.getAmount();
  }

  public getAmount() : number {
  	return this.amount;
  }

}
