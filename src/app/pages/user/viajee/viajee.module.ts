import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajeePageRoutingModule } from './viajee-routing.module';

import { ViajeePage } from './viajee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajeePageRoutingModule
  ],
  declarations: [ViajeePage]
})
export class ViajeePageModule {}
