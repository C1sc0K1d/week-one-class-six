import { Component, OnInit } from '@angular/core';

import { Product } from '../utils/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  seeModal: boolean = false;

  products: Product[] = [
    {id: 1, name: 'Guitar', image: '🎸', price: 87.00},
    {id: 2, name: 'Sax', image: '🎷', price: 92.00},
    {id: 3, name: 'Violin', image: '🎻', price: 121.00},
    {id: 4, name: 'Trumpet', image: '🎺', price: 82.90}
  ]

  cart: Product[] = [];

  total: number = 0;

  subTotal: number = 0;

  constructor() { }

  ngOnInit() : void { }

  addProduct(product: Product) : void {
    let index = this.findIndex(product);

    if(index !== -1) {
      let qtt = this.cart[index].quantity || 1;
      this.cart[index].quantity = qtt + 1;
    } else {
      product.quantity = 1;
      this.cart.push(product)
    }

    this.calculatePrice(this.cart);
  }

  callModal() {
    this.seeModal = !this.seeModal;
  }

  findIndex(product: Product) : number {
    let index = this.cart.findIndex(item => {      
      if (item.id == product.id) return true;
      return false;
    });
    return index;
  }

  calculatePrice(cart: Product[]) : void {
    this.total = 0;
    for (let product of cart) {
      this.total = this.total + ((product.price || 0) * (product.quantity || 1));
    }

    this.subTotal = this.total * 0.9;
  }

}
