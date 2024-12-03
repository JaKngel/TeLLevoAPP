import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarViajePageRoutingModule } from './editar-viaje-routing.module';

import { EditarViajePage } from './editar-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarViajePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditarViajePage]
})
export class EditarViajePageModule {}
