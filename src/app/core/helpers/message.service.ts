import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  messages: string[] = [];

  isClearCart: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages = [];
    this.isClearCart = false;
  }

  clearCart() {
    this.messages = [];
    this.isClearCart = false;
    this.cartService.setCart([]);
    this.router.navigate(['/cart']);
  }
}
