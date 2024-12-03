import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UmapPageRoutingModule } from './umap-routing.module';

import { UmapPage } from './umap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UmapPageRoutingModule
  ],
  declarations: [UmapPage]
})
export class UmapPageModule {}
