import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RestablecerPage } from './restablecer.page';
import { RestablecerPageRoutingModule } from './restablecer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RestablecerPageRoutingModule
  ],
  declarations: [RestablecerPage],
})
export class RestablecerPageModule {}
