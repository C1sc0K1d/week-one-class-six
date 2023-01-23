import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

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
  // Populate from the service mock
   this.cart = this.cartService.getCart();
   // Get the value of the total value
   this.total = this.cartService.calculatePrice(this.cart)[0];
   // Get the value of the subtotal value
   this.subTotal = this.cartService.calculatePrice(this.cart)[1];
   // Check if the sub-price has been changed and set the value of the component sub-total
   this.cartService.sendSubPriceValue.subscribe(price => this.subTotal = price);
   // Check if the Price has been changed and set the value of the component price
   this.cartService.sendTotalValue.subscribe(price => this.total = price);
   // Check if the Cart has been changed and set the value of the component cart
   this.cartService.sendCartObject.subscribe(cartObject => this.cart = cartObject);
   // Check if the cart have discount seted
   this.haveDiscount = this.cartService.getHaveDiscount();
   if (this.haveDiscount) {
     this.totalOrSubTotalText = 'Sub-total: ';
   }
 }

 // Go back to home page
 goBack() {
  this.router.navigate(['/home']);
  this.cartService.setCart([]);
}

}
