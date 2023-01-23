import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './pages/cart/cart.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [			
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CartModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
