import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailsComponent } from './products-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: ':id',
		component: ProductsDetailsComponent
	}
];

@NgModule({
  declarations: [
    ProductsDetailsComponent
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
export class ProductsDetailsModule { }
