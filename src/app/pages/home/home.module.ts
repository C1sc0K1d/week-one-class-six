import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home.component";
import { ItemsComponent } from "./items/items.component";

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	}
];

@NgModule({
	declarations: [
		HomeComponent,
		ItemsComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		RouterModule
	]
})
export class HomeModule {}