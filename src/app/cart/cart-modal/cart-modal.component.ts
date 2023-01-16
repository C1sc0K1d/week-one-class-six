import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/utils/interfaces/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  @Input() cart: Product[] = [];

  @Input() total: number = 0;

  @Input() subTotal: number = 0;

  @Output() closeModalEvent = new EventEmitter<void>();

  @Output() subtractTotalEvent = new EventEmitter<Product[]>();

  discount: string = ''

  haveDiscount: boolean = false;

  constructor() { }

  ngOnInit() : void { }

  closeModal() : void {
    this.haveDiscount = false;
    this.closeModalEvent.emit();
  }

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

  findIndex(product: Product) : number {
    let index = this.cart.findIndex(item => {      
      if (item.id == product.id) return true;
      return false;
    });
    return index;
  }

  subtractTotal(cart: Product[]) : void {
    this.subtractTotalEvent.emit(cart);
  }

  getDiscount(discountCode: string) {
    if (discountCode.toUpperCase() === "10OFF") {
      this.haveDiscount = true;
    }
  }

}
