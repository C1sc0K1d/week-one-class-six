import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/utils/interfaces/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  // Input variables
  @Input() cart: Product[] = [];

  @Input() total: number = 0;

  @Input() subTotal: number = 0;

  //Output events
  @Output() closeModalEvent = new EventEmitter<void>();

  @Output() subtractTotalEvent = new EventEmitter<Product[]>();

  // Variables
  discount: string = ''

  haveDiscount: boolean = false;

  constructor() { }

  // Functions
  ngOnInit() : void { }

  // Function to close the cart modal with the close modal event
  closeModal() : void {
    this.haveDiscount = false;
    this.closeModalEvent.emit();
  }

  // Function to remove a item, quantity and the item itself
  removeItem(product: Product) : void {
    
    let index = this.findIndex(product);

    if (product.quantity === 1) {
      this.cart.splice(index, 1)
    } else {
      let qtt = this.cart[index].quantity || 1;
      this.cart[index].quantity = qtt - 1;
    }

    this.subtractTotal(this.cart);

  }

  // Function to find the index of the product wanted
  findIndex(product: Product) : number {
    let index = this.cart.findIndex(item => {      
      if (item.id == product.id) return true;
      return false;
    });
    return index;
  }

  // Function to subtract from the total the price value from the removed item, call subtract total event
  subtractTotal(cart: Product[]) : void {
    this.subtractTotalEvent.emit(cart);
  }

  // Function to see the discount and check if the user is inserting the right cupom
  getDiscount(discountCode: string) {
    if (discountCode.toUpperCase() === "10OFF") {
      this.haveDiscount = true;
    }
  }

}
