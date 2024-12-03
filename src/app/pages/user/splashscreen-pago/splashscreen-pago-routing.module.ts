import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashscreenPagoPage } from './splashscreen-pago.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscreenPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashscreenPagoPageRoutingModule {}
