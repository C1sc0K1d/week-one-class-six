import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  // Input variables
  @Input() haveDiscount: boolean = false;

  // Variables
  cart: Product[] = [];

  discount: string = ''

  total: number = 0;

  subTotal: number = 0;

  totalOrSubTotalText: string = 'Total: ';

  constructor(private cartService: CartService, private router: Router) { }

  // Functions
  ngOnInit() : void {
    // Check if the sub-price has been changed and update the value of the modal sub-price
    this.cartService.sendSubPriceValue.subscribe(price => {
      this.subTotal = price;
      if (this.cartService.getHaveDiscount()) {
        this.haveDiscount = this.cartService.getModalStatus();;
        this.totalOrSubTotalText = 'Sub-total: ';
      }
    });
    // Check if the price has been changed and update the value of the modal price
    this.cartService.sendTotalValue.subscribe(price => {
      this.total = price
      if (this.cartService.getHaveDiscount()) {
        this.haveDiscount = this.cartService.getModalStatus();
        this.totalOrSubTotalText = 'Sub-total: ';
      }
    });
    // Check if the cart has been changed and update the value of the modal cart
    this.cartService.sendCartObject.subscribe(cartObject => this.cart = cartObject);
  }

  // Function to close the cart modal with the close modal event
  closeModal() : void {
    if (!this.cartService.getHaveDiscount()) {
      this.totalOrSubTotalText = 'Total: ';
    }
    this.cartService.callModal();
    this.haveDiscount = this.cartService.getModalStatus();
  }

  // Function to remove a item
  removeItem(product: Product) : void {
    this.cart = this.cartService.removeItem(product);
  }

  // Function to add a new item
  addItem(product: Product) : void {
    product.quantity = (product.quantity || 0) + 1;
    this.cart = this.cartService.addProduct(product);
  }

  // Go to the wanted page;
  goToPage(page: string): void {
    this.closeModal()
    this.router.navigate([page]);
  }

}
