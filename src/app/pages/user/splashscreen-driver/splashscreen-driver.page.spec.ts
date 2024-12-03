import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashscreenDriverPage } from './splashscreen-driver.page';

describe('SplashscreenDriverPage', () => {
  let component: SplashscreenDriverPage;
  let fixture: ComponentFixture<SplashscreenDriverPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscreenDriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
