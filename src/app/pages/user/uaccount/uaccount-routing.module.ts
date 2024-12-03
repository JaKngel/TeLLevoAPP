import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UaccountPage } from './uaccount.page';

const routes: Routes = [
  {
    path: '',
    component: UaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UaccountPageRoutingModule {}
