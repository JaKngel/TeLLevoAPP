import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaccountPageRoutingModule } from './daccount-routing.module';

import { DaccountPage } from './daccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaccountPageRoutingModule
  ],
  declarations: [DaccountPage]
})
export class DaccountPageModule {}
