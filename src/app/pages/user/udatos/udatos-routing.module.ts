import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UdatosPage } from './udatos.page';

const routes: Routes = [
  {
    path: '',
    component: UdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UdatosPageRoutingModule {}
