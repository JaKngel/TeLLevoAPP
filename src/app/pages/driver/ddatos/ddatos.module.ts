import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DdatosPageRoutingModule } from './ddatos-routing.module';

import { DdatosPage } from './ddatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    DdatosPageRoutingModule
  ],
  declarations: [DdatosPage]
})
export class DdatosPageModule {}
