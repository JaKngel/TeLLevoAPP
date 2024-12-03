import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DdatosPage } from './ddatos.page';

describe('DdatosPage', () => {
  let component: DdatosPage;
  let fixture: ComponentFixture<DdatosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
