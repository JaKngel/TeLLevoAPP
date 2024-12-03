import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UprofilePage } from './uprofile.page';

const routes: Routes = [
  {
    path: '',
    component: UprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UprofilePageRoutingModule {}
