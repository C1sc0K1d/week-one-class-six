import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

import { Product } from 'src/app/shared/interfaces/product';


@Component({
  selector: 'app-cart',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables
  cart: Product[] = []

  products: Product[] = [];

  constructor(private cartService: CartService) { }  

  // Functions
  ngOnInit() : void { 
    this.products = this.cartService.getProducts();
    this.cartService.sendFilter.subscribe(filter => {      
      this.products = this.cartService.filterProduct(this.cartService.getProducts(), filter);
    });
  }

  // Function to add aproduct to the cart
  addProduct(product: Product) : void {
    product.quantity = this.cartService.findIndex(product) !== -1 ? (product.quantity || 0) + 1 : 1;
    this.cart = this.cartService.addProduct(product);
  }

}
