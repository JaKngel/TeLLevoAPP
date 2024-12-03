import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UdatosPage } from './udatos.page';

describe('UdatosPage', () => {
  let component: UdatosPage;
  let fixture: ComponentFixture<UdatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
