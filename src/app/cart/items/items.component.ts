import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/utils/interfaces/product';

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

  constructor() { }

  // Functions
  ngOnInit() : void { }

  // Function to add aproduct to the cart, calls the add product event
  addProduct(product: Product) : void {
    this.addProductEvent.emit(product);
  }

}
