import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UaccountPageRoutingModule } from './uaccount-routing.module';

import { UaccountPage } from './uaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UaccountPageRoutingModule
  ],
  declarations: [UaccountPage]
})
export class UaccountPageModule {}
