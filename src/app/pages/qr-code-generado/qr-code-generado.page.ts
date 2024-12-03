import { Component, Input, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code-generado',
  templateUrl: './qr-code-generado.page.html',
  styleUrls: ['./qr-code-generado.page.scss'],
})
export class QrCodeGeneradoPage implements OnInit {
  @Input() data: string = '';

  qrCodeUrl: string = '';

  constructor() {}

  ngOnInit() {
    this.generateQrCode();
  }

  async generateQrCode() {
    try {
      this.qrCodeUrl = await QRCode.toDataURL(this.data);
    } catch (error) {
      console.error('Error generating QR code', error);
    }
  }
}