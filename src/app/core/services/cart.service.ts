import { Injectable, EventEmitter } from "@angular/core";
import { Product } from "src/app/shared/interfaces/product";

@Injectable({
    providedIn: "root"
})

export class CartService {

	// Emitters variables
	public sendTotalValue = new EventEmitter<number>();
	public sendSubPriceValue = new EventEmitter<number>();
  public sendCartObject = new EventEmitter<Product[]>();
  public callModalEmitter = new EventEmitter<boolean>();
  public sendAllProductsQuantity = new EventEmitter<number>();
  public sendFilter = new EventEmitter<string>();

	// Variables
  private products: Product[] = [
    {id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
    {id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'},
    {id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, type: 'acords'},
    {id: 4, name: 'Trumpet', image: 'assets/imgs/trumpet.jpg', price: 82.90, type: 'wind'},
    {id: 5, name: 'Piano', image: 'assets/imgs/piano.jpg', price: 435.87, type: 'acords'},
    {id: 6, name: 'Flute', image: 'assets/imgs/flute.jpg', price: 32.10, type: 'wind'},
    {id: 7, name: 'Harp', image: 'assets/imgs/harp.jpg', price: 45.00, type: 'acords'},
    {id: 8, name: 'Drums', image: 'assets/imgs/drums.jpg', price: 213.33, type: 'percussion'}
  ]

  private cart: Product[] = [];

  private total: number = 0;

  private subTotal: number = 0;

  private modalVisibility: boolean = false;

  private haveDiscount: boolean = false;

  private promoCode: string = '';

  private filter: string = '';

  constructor() { }

	// Call all current Products
	public getProducts() : Product[] { 
	  return this.products;
  }

  // Get the product wanted by the id
  public getProduct(id : number) : Product {
   return this.products.find(item => (item.id == id) ? true : false) || {};
  }

  //See if modal is visible
  getModalStatus() : boolean {
    return this.modalVisibility;
  }

  // Call the cart modal to pre check que values end products
  public callModal() : void {
    this.modalVisibility = !this.modalVisibility;
    this.callModalEmitter.emit(this.modalVisibility);
  }

  // Get the current cart state
  public getCart() : Product[] {
    return this.cart;
  }

  // Set a value to the cart
  public setCart(value : Product[]) {
    this.cart = value;
    this.calculatePrice(value);
    this.sendCartObject.emit(value);
  }

  // See if the discout is active
  public getHaveDiscount() : boolean {
    return this.haveDiscount;
  }

  // Activate the discout
  private setHaveDiscount() : void {
    this.haveDiscount = true;
  }

  // Set the filter type, type. Emit  the value
  public setFilter(filter: string) : void {
    this.filter = filter;
    this.sendFilter.emit(this.filter);
  }

	 // Function to calculate the price and the sub-price, emit the price and the sub-price
	 public calculatePrice(cart: Product[]) : number[] {
    this.subTotal = 0;
    for (let product of cart) {
      this.subTotal = this.subTotal + ((product.price || 0) * (product.quantity || 1));
    }

		this.sendSubPriceValue.emit(this.subTotal);
    this.calculateAllProductsQuantity();
    this.calculateDiscount(this.promoCode);
    return [this.total, this.subTotal];
  }

  // Calculate the discount acording to the code
  public calculateDiscount(code: string): void {
    this.promoCode = code;
    
    switch (this.promoCode.toLocaleUpperCase()) {
      case '10OFF':
        this.total = this.subTotal * 0.9
        this.setHaveDiscount();
        break;

        case 'INSTRUMENXONADO':
          this.total = this.subTotal * 0.8
          this.setHaveDiscount();
          break;
      
      default:
        this.total = this.subTotal;
        break;
    }
    this.sendTotalValue.emit(this.total);
  }

  // Function to find the index of the product wanted 
  public findIndex(product: Product) : number {
    return this.cart.findIndex(item => (item.id == product.id) ? true : false);
  }

  // Calculate the total quantity of products
  private calculateAllProductsQuantity() : void { 
    let quantity = 0;
    for (let product of this.cart) {
      quantity = quantity + (product.quantity || 0);
    }
    this.sendAllProductsQuantity.emit(quantity);
  }

  // Function to add aproduct to the cart, it checks if the product aready at the cart, if it is, just add to the quantity, returns the cart Product
  public addProduct(product: Product) : Product[] {
    let index = this.findIndex(product);

    if(index !== -1) {
      this.cart[index].quantity = product.quantity;
    } else {
      product.quantity = product.quantity ? product.quantity : 1;
      this.cart.push(product)
    }

    this.calculatePrice(this.cart);
    this.sendCartObject.emit(this.cart);
		return this.cart;
  }

	// Function to remove aproduct from the cart, return the Product object
	public removeItem(product: Product) : Product[] {
    
    let index = this.findIndex(product);

    if (product.quantity === 1) {
      this.cart.splice(index, 1)
    } else {
      let qtt = this.cart[index].quantity || 1;
      this.cart[index].quantity = qtt - 1;
    }

    this.calculatePrice(this.cart);
    this.sendCartObject.emit(this.cart);
		return this.cart;
  }

  // Delete a item from the cart
  public deleteItem(product: Product) : Product[] {
    
    let index = this.findIndex(product);

    this.cart.splice(index, 1);

    this.calculatePrice(this.cart);
    this.sendCartObject.emit(this.cart);
		return this.cart;
  }

  // Filter the products by the type
  public filterProduct(products: Product[], filter: string): Product[] {
    if (this.filter) return products.filter(product => product.type === filter.toLocaleLowerCase());
    else return this.products;
  }
}