import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UmapPage } from './umap.page';

const routes: Routes = [
  {
    path: '',
    component: UmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UmapPageRoutingModule {}
