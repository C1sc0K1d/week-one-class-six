/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render footer text one', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.fp')?.textContent).toContain('Facilitação prosper 2');
  });

  it('should render footer text two', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mb')?.textContent).toContain('Made by: Gabriel Calil');
  });
});
