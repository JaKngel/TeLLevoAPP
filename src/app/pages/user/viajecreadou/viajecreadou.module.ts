import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViajecreadouPageRoutingModule } from './viajecreadou-routing.module';

import { ViajecreadouPage } from './viajecreadou.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViajecreadouPageRoutingModule
  ],
  declarations: [ViajecreadouPage]
})
export class ViajecreadouPageModule {}
