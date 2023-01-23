import { Component, OnInit } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { Product } from './shared/interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  // Variables
  title = 'TheMusicalCart';
  
  seeModal: boolean = false;

  cart: Product[] = [];

  haveDiscount: boolean = false;

  menu: boolean = false;
  
  constructor(private cartService: CartService) { }

  // Functions
  ngOnInit(): void {
    this.cartService.callModalEmitter.subscribe(isVisible => {
      this.seeModal = isVisible;
      this.haveDiscount = this.cartService.getHaveDiscount();
    });
    this.cartService.sendCartObject.subscribe(cartObject => this.cart = cartObject);
  }

  // Call the menu whes is on mobile mode
  callMenu() {
    this.menu = !this.menu;
  }
}
