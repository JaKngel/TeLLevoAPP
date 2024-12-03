import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DaccountPage } from './daccount.page';

const routes: Routes = [
  {
    path: '',
    component: DaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DaccountPageRoutingModule {}
