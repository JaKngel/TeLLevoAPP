import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashscreenDriverPage } from './splashscreen-driver.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscreenDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashscreenDriverPageRoutingModule {}
