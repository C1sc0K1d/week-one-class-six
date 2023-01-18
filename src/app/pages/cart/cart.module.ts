import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CartModalComponent } from "./cart-modal/cart-modal.component";

import { CartComponent } from "./cart.component";
import { ItemsComponent } from "./items/items.component";

const routes: Routes = [
	{
		path: '',
		component: CartComponent
	}
];

@NgModule({
	declarations: [
		CartComponent,
		ItemsComponent,
		CartModalComponent
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