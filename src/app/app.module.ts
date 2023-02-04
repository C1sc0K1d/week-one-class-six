import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './pages/cart/cart.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './pages/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminGuard } from './core/guards/admin.guard';
import { UserGuard } from './core/guards/user.guard';
import { AuthTokenInterceptor } from './core/authentication/auth-token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxUiLoaderModule } from "ngx-ui-loader";

@NgModule({
  declarations: [			
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CartModule,
    LoginModule,
    HttpClientModule,
		ReactiveFormsModule,
    NgxUiLoaderModule
  ],
  providers: [
    AdminGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
