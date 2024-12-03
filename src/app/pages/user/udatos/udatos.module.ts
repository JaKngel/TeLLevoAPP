import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';

import { UdatosPageRoutingModule } from './udatos-routing.module';
import { UdatosPage } from './udatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    IonicModule,
    UdatosPageRoutingModule
  ],
  declarations: [UdatosPage]
})
export class UdatosPageModule {}
