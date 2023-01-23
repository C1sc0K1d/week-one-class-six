import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  // Input variables
  @Input() product: Product = {};

  // Output Events
  @Output() addProductEvent = new EventEmitter<Product>();

  constructor(private router: Router) { }

  // Functions
  ngOnInit() : void { }

  // Function to add aproduct to the cart, calls the add product event
  addProduct(product: Product) : void {
    this.addProductEvent.emit(product);
  }

  // Go to the product page
  goToProduct(id: number) : void {
    this.router.navigate([ 'product-detail', id]);
  }

}
