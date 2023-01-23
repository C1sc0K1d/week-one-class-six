import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Variables
  cart: Product[] = [];
  
  items_qtt = 0;

  constructor(private cartService: CartService) { }

  // Functions
  ngOnInit() : void { 
    // Check if the cart has been changed and update the value of the modal cart
    this.cartService.sendCartObject.subscribe(cart => this.cart = cart);
    // Check if the item quantity has been changed and update the value of the modal item quantity
    this.cartService.sendAllProductsQuantity.subscribe(qtt => this.items_qtt = qtt);
  }

  // Call the cart modal
  callModal() : void {
    this.cartService.callModal();
  }

}
