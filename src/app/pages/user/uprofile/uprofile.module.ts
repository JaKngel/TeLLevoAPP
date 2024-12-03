import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UprofilePageRoutingModule } from './uprofile-routing.module';

import { UprofilePage } from './uprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UprofilePageRoutingModule
  ],
  declarations: [UprofilePage]
})
export class UprofilePageModule {}
