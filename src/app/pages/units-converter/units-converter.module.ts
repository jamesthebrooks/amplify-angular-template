import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitsConverterPageRoutingModule } from './units-converter-routing.module';

import { UnitsConverterPage } from './units-converter.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    UnitsConverterPageRoutingModule,
    IonicModule,
    NgForOf,
    NgIf,
    SharedModule,
    IonicModule
  ],
  declarations: [UnitsConverterPage]
})
export class UnitsConverterPageModule {}
