import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DdestinoPage } from './ddestino.page';

const routes: Routes = [
  {
    path: '',
    component: DdestinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DdestinoPageRoutingModule {}
