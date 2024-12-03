import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashscreenPagoPage } from './splashscreen-pago.page';

describe('SplashscreenPagoPage', () => {
  let component: SplashscreenPagoPage;
  let fixture: ComponentFixture<SplashscreenPagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscreenPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
