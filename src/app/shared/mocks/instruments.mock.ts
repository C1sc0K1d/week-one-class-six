import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class InstrumentMock {
	public  products: Product[] = [
		{id: 1, name: 'Guitar', image: 'assets/imgs/guitar.jpg', price: 87.00, type: 'acords'},
		{id: 2, name: 'Sax', image: 'assets/imgs/sax.jpg', price: 92.00, type: 'wind'},
		{id: 3, name: 'Violin', image: 'assets/imgs/violin.jpg', price: 121.00, type: 'acords'},
		{id: 4, name: 'Trumpet', image: 'assets/imgs/trumpet.jpg', price: 82.90, type: 'wind'},
		{id: 5, name: 'Piano', image: 'assets/imgs/piano.jpg', price: 435.87, type: 'acords'},
		{id: 6, name: 'Flute', image: 'assets/imgs/flute.jpg', price: 32.10, type: 'wind'},
		{id: 7, name: 'Harp', image: 'assets/imgs/harp.jpg', price: 45.00, type: 'acords'},
		{id: 8, name: 'Drums', image: 'assets/imgs/drums.jpg', price: 213.33, type: 'percussion'}
	];

}