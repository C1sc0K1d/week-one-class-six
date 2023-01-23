import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  // Variables
  paymentMethod : string = '';

  constructor(private router: Router) { }

  // Functions
  ngOnInit(): void {}

  // Go to the confirmation page
  goToConfirmation(): void {
    this.router.navigate(['/cart/confirmation']);
  }

  // Select the payment method
  selectMethod(method: string): void {
    console.log(method);
    
    this.paymentMethod = method;
  }

}
