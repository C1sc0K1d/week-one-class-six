import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {

  // Variables
  product: Product = {};

  quantity: number = 1;

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router) { }

  // Functions
  ngOnInit(): void {
    // Get the id padded on the route and search from the products the product belonged id
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.product = this.cartService.getProduct(parseInt(productId));
    });
  }

  // Add product to the cart
  addProduct(product: Product): void {
    product.quantity = this.cartService.findIndex(product) !== -1 ? this.quantity + (this.product.quantity || 0) : this.quantity;
    this.cartService.addProduct(product);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
