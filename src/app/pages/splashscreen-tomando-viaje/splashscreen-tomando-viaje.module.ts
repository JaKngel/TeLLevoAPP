import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SplashscreenTomandoViajePageRoutingModule } from './splashscreen-tomando-viaje-routing.module';
import { SplashscreenTomandoViajePage } from './splashscreen-tomando-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscreenTomandoViajePageRoutingModule
  ],
  declarations: [SplashscreenTomandoViajePage]
})
export class SplashscreenTomandoViajePageModule {}