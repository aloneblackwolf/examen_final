import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CambiopassPageRoutingModule } from './cambiopass-routing.module';

import { CambiopassPage } from './cambiopass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiopassPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CambiopassPage]
})
export class CambiopassPageModule {}
