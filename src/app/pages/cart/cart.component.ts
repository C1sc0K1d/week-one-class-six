import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Input variables
  cart: Product[] = [];

  // Variables
  discount: string = ''

  haveDiscount: boolean = false;

  total: number = 0;

  subTotal: number = 0;

  totalOrSubTotalText: string = 'Total: ';

  constructor(private cartService: CartService, private router: Router) { }

  // Functions
  ngOnInit() : void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.calculatePrice(this.cart)[0];
    this.subTotal = this.cartService.calculatePrice(this.cart)[1];
    this.cartService.sendSubPriceValue.subscribe(price => this.subTotal = price);
    this.cartService.sendTotalValue.subscribe(price => this.total = price);
    this.cartService.sendCartObject.subscribe(cartObject => this.cart = cartObject);
    this.haveDiscount = this.cartService.getHaveDiscount();
    if (this.haveDiscount) {
      this.totalOrSubTotalText = 'Sub-total: ';
    }
  }

  // Function to remove a item
  removeItem(product: Product) : void {
    this.cart = this.cartService.removeItem(product);
  }

  // Function to delete a product calling the cart service
  deleteItem(product: Product) : void {
    this.cart = this.cartService.deleteItem(product);
  }

  // Function to add a new item
  addItem(product: Product) : void {
    product.quantity = (product.quantity || 0) + 1;
    this.cart = this.cartService.addProduct(product);
  }

  // Function to see the discount and check if the user is inserting the right cupom
  getDiscount(discountCode: string) {
    if (discountCode.toUpperCase() === "10OFF") {
      this.discountSetings(discountCode);
    } 
    if (discountCode.toUpperCase() === "INSTRUMENXONADO") {
      this.discountSetings(discountCode);
    }
  }

  // Configure the discount setings
  discountSetings(discountCode: string) : void {
    this.cartService.calculateDiscount(discountCode);
    this.totalOrSubTotalText = 'Sub-total: ';
    this.haveDiscount = this.cartService.getHaveDiscount();
  }

  // Go to a specific page setted on the html
  goToPage(page: string): void {
    this.router.navigate([page]);
  }

}
