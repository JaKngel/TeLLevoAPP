import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DdatosPage } from './ddatos.page';

const routes: Routes = [
  {
    path: '',
    component: DdatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DdatosPageRoutingModule {}
