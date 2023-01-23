import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login.component";
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserGuard } from "src/app/core/guards/user.guard";
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
    path: 'user',
		component: UserComponent,
		canActivate : [UserGuard]
	}
];

@NgModule({
	declarations: [
		LoginComponent,
		AdminComponent,
		UserComponent
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
export class LoginModule {}