import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprofilePage } from './aprofile.page';

const routes: Routes = [
  {
    path: '',
    component: AprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprofilePageRoutingModule {}
