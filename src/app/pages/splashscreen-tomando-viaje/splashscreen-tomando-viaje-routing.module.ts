import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashscreenTomandoViajePage } from './splashscreen-tomando-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscreenTomandoViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashscreenTomandoViajePageRoutingModule {}