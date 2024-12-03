import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashscreenDriverPageRoutingModule } from './splashscreen-driver-routing.module';

import { SplashscreenDriverPage } from './splashscreen-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscreenDriverPageRoutingModule
  ],
  declarations: [SplashscreenDriverPage]
})
export class SplashscreenDriverPageModule {}
