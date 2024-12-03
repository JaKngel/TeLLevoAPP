import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashscreenTomandoViajePage } from './splashscreen-tomando-viaje.page';

describe('SplashscreenTomandoViajePage', () => {
  let component: SplashscreenTomandoViajePage;
  let fixture: ComponentFixture<SplashscreenTomandoViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscreenTomandoViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
