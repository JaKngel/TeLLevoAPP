import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrCodeGeneradoPage } from './qr-code-generado.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodeGeneradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrCodeGeneradoPageRoutingModule {}
