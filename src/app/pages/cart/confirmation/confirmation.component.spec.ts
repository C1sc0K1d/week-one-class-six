import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/core/services/cart.service';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let service: CartService;
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationComponent ],
      imports: [ RouterTestingModule ],
      providers: [ CartService ]
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmationComponent);
    service = TestBed.inject(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
