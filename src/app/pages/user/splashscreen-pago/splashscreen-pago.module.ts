import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashscreenPagoPageRoutingModule } from './splashscreen-pago-routing.module';

import { SplashscreenPagoPage } from './splashscreen-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscreenPagoPageRoutingModule
  ],
  declarations: [SplashscreenPagoPage]
})
export class SplashscreenPagoPageModule {}
