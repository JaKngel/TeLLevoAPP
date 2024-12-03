import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UzonasPageRoutingModule } from './uzonas-routing.module';

import { UzonasPage } from './uzonas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UzonasPageRoutingModule
  ],
  declarations: [UzonasPage]
})
export class UzonasPageModule {}
