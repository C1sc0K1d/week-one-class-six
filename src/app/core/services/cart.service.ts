import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "src/app/shared/interfaces/product";

@Injectable({
    providedIn: "root"
})

export abstract class CartService {

	// Emitters variables
	public sendTotalValue = new EventEmitter<number>();
	public sendSubPriceValue = new EventEmitter<number>();

	// Variables
  private products: Product[] = [
    {id: 1, name: 'Guitar', image: '🎸', price: 87.00},
    {id: 2, name: 'Sax', image: '🎷', price: 92.00},
    {id: 3, name: 'Violin', image: '🎻', price: 121.00},
    {id: 4, name: 'Trumpet', image: '🎺', price: 82.90}
  ]

  private cart: Product[] = [];

  private total: number = 0;

  private subTotal: number = 0;

  constructor() { }

	// Function to call Products and return itself
	public getProducts() : Product[] { 
	  return this.products;
  }

	 // Function to calculate the price and the sub-price, emit the price and the sub-price
	 public calculatePrice(cart: Product[]) : void {
    this.subTotal = 0;
    for (let product of cart) {
      this.subTotal = this.subTotal + ((product.price || 0) * (product.quantity || 1));
    }

    this.total = this.subTotal * 0.9;

		this.sendTotalValue.emit(this.total);
		this.sendSubPriceValue.emit(this.subTotal);
  }

  // Function to add aproduct to the cart, it checks if the product aready at the cart, if it is, just add to the quantity, returns the cart Product
  public addProduct(product: Product) : Product[] {
    let index = this.findIndex(product);

    if(index !== -1) {
      let qtt = this.cart[index].quantity || 1;
      this.cart[index].quantity = qtt + 1;
    } else {
      product.quantity = 1;
      this.cart.push(product)
    }

    this.calculatePrice(this.cart);
		return this.cart;
  }

  // Function to find the index of the product wanted 
  public findIndex(product: Product) : number {
    return this.cart.findIndex(item => (item.id == product.id) ? true : false);
  }

	// Function to remove aproduct from the cart, return the Product object
	removeItem(product: Product) : Product[] {
    
    let index = this.findIndex(product);

    if (product.quantity === 1) {
      this.cart.splice(index, 1)
    } else {
      let qtt = this.cart[index].quantity || 1;
      this.cart[index].quantity = qtt - 1;
    }

    this.calculatePrice(this.cart);

		return this.cart;

  }



}