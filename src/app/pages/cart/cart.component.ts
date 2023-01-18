import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

import { Product } from 'src/app/shared/interfaces/product';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  // Variables
  seeModal: boolean = false;

  cart: Product[] = []

  products: Product[] = [];

  constructor(private cartService: CartService) { }  

  // Functions
  ngOnInit() : void { 
    this.products = this.cartService.getProducts();
  }

  // Function to add aproduct to the cart
  addProduct(product: Product) : void {
    this.cart = this.cartService.addProduct(product);
  }

  // Function to open the cart modal
  callModal() {
    this.seeModal = !this.seeModal;
  }

}
