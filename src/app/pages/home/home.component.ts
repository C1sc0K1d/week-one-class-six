import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { InstrumentService } from 'src/app/core/services/instrument.service';

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
  filteredProducts: Product[] = [];

  searcher: string = '';

  constructor(private cartService: CartService, private instrumentService: InstrumentService) { }  

  // Functions
  ngOnInit() : void {
    
    // Get instruments from the database
    this.instrumentService.getAllInstruments().subscribe(instrument => {
      this.cartService.setProducts(instrument.instruments);
       this.filteredProducts = this.products = this.cartService.getProducts();
    });

    // Filter the products using the service
    this.cartService.sendFilter.subscribe(filter => {      
      this.products = this.cartService.filterProduct(this.cartService.getProducts(), filter);
    });
  }

  // Function to add aproduct to the cart
  addProduct(product: Product) : void {
    product.quantity = this.cartService.findIndex(product) !== -1 ? (product.quantity || 0) + 1 : 1;
    this.cart = this.cartService.addProduct(product);
  }

  filterByValue(array: any[], string: string): void {
    console.log();
    this.filteredProducts = this.products;
    this.filteredProducts = array.filter(function(obj) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key]?.toString().toLowerCase().includes(string.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }
}
