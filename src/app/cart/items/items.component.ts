import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/utils/interfaces/product';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() product: Product = {};

  @Output() addProductEvent = new EventEmitter<Product>();

  constructor() { }

  ngOnInit() : void { }

  addProduct(product: Product) : void {
    this.addProductEvent.emit(product);
  }

}
