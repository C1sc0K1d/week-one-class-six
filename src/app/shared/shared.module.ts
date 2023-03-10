import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavigatorComponent,
    NotFoundComponent,
		CartModalComponent
  ],
  imports: [
    CommonModule,
		FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavigatorComponent,
    NotFoundComponent,
		CartModalComponent
  ]
})
export class SharedModule { }
