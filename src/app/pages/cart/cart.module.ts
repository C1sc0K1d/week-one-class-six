import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/core/guards/admin.guard";
import { UserGuard } from "src/app/core/guards/user.guard";

import { CartComponent } from "./cart.component";
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
	{
		path: '',
		component: CartComponent
	},
	{
		path: 'checkout',
    component: CheckoutComponent,
		canActivate: [UserGuard]
	},
	{
		path: 'confirmation',
    component: ConfirmationComponent,
		canActivate: [UserGuard]
  }
];

@NgModule({
	declarations: [
		CartComponent,
  	CheckoutComponent,
  	ConfirmationComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule 
	],
	exports: [
		RouterModule
	]
})
export class CartModule {}