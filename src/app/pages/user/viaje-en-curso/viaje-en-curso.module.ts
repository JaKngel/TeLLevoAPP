import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViajeEnCursoPageRoutingModule } from './viaje-en-curso-routing.module';
import { ViajeEnCursoPage } from './viaje-en-curso.page';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeEnCursoPageRoutingModule,
    QrCodeModule
  ],
  declarations: [ViajeEnCursoPage, BarcodeScanningModalComponent],
  exports: [BarcodeScanningModalComponent] 
})
export class ViajeEnCursoPageModule {}