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

  async add(message: string): Promise<void> {
    this.messages.push(message);
    await new Promise(f => setTimeout(f, 4000));
    this.clear();
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
