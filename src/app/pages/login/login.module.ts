import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login.component";
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from "./signin/signin.component";
import { AdminGuard } from "src/app/core/guards/admin.guard";

const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	{
    path: 'admin',
    component: AdminComponent,
		canActivate : [AdminGuard]
	},
	{
		path:'signin',
		component: SigninComponent
	}
];

@NgModule({
	declarations: [
		LoginComponent,
		AdminComponent,
		UserComponent,
		SigninComponent
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
export class LoginModule {}