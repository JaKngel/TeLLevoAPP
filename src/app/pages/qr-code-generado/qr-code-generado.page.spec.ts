import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrCodeGeneradoPage } from './qr-code-generado.page';

describe('QrCodeGeneradoPage', () => {
  let component: QrCodeGeneradoPage;
  let fixture: ComponentFixture<QrCodeGeneradoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeGeneradoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
