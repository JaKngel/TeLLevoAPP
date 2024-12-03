import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViajeePage } from './viajee.page';

const routes: Routes = [
  {
    path: '',
    component: ViajeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViajeePageRoutingModule {}
