import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrCodeGeneradoPageRoutingModule } from './qr-code-generado-routing.module';
import { QrCodeGeneradoPage } from './qr-code-generado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodeGeneradoPageRoutingModule
  ],
  declarations: [QrCodeGeneradoPage],
  exports: [QrCodeGeneradoPage]
})
export class QrCodeGeneradoPageModule {}