import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViajecreadoPageRoutingModule } from './viajecreado-routing.module';
import { ViajecreadoPage } from './viajecreado.page';
import { QrCodeGeneradoPageModule } from '../qr-code-generado/qr-code-generado.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajecreadoPageRoutingModule,
    QrCodeGeneradoPageModule
  ],
  declarations: [ViajecreadoPage]
})
export class ViajecreadoPageModule {}