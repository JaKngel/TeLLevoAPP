import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajecreadoPage } from './viajecreado.page';

const routes: Routes = [
  {
    path: '',
    component: ViajecreadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajecreadoPageRoutingModule {}
