import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DdestinoPageRoutingModule } from './ddestino-routing.module';

import { DdestinoPage } from './ddestino.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DdestinoPageRoutingModule
  ],
  declarations: [DdestinoPage]
})
export class DdestinoPageModule {}
