import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UzonasPage } from './uzonas.page';

const routes: Routes = [
  {
    path: '',
    component: UzonasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UzonasPageRoutingModule {}
