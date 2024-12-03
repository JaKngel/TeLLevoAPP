import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprofilePageRoutingModule } from './aprofile-routing.module';

import { AprofilePage } from './aprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprofilePageRoutingModule
  ],
  declarations: [AprofilePage]
})
export class AprofilePageModule {}
