import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeePage } from './viajee.page';

describe('ViajeePage', () => {
  let component: ViajeePage;
  let fixture: ComponentFixture<ViajeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
