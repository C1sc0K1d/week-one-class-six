import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  // Input variables
  @Input() cart: Product[] = [];

  //Output events
  @Output() closeModalEvent = new EventEmitter<void>();

  // Variables
  discount: string = ''

  haveDiscount: boolean = false;

  total: number = 0;

  subTotal: number = 0;

  totalOrSubTotalText: string = 'Total: ';

  constructor(private cartService: CartService) { }

  // Functions
  ngOnInit() : void {
    this.cartService.sendSubPriceValue.subscribe(price => this.subTotal = price);
    this.cartService.sendTotalValue.subscribe(price => this.total = price);
  }

  // Function to close the cart modal with the close modal event
  closeModal() : void {
    this.haveDiscount = false;
    this.totalOrSubTotalText = 'Total: ';
    this.closeModalEvent.emit();
  }

  // Function to remove a item
  removeItem(product: Product) : void {
    this.cart = this.cartService.removeItem(product);
  }

  // Function to add a new item
  addItem(product: Product) : void { 
    this.cart = this.cartService.addProduct(product);
  }

  // Function to see the discount and check if the user is inserting the right cupom
  getDiscount(discountCode: string) {
    if (discountCode.toUpperCase() === "10OFF") {
      this.totalOrSubTotalText = 'Sub-total: ';
      this.haveDiscount = true;
    }
  }

}
