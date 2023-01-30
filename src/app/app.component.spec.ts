import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CartModalComponent } from './shared/components/cart-modal/cart-modal.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { NavigatorComponent } from './shared/components/navigator/navigator.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CartModalComponent,
        NavigatorComponent,
        MessagesComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TheMusicalCart'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TheMusicalCart');
  });
});
