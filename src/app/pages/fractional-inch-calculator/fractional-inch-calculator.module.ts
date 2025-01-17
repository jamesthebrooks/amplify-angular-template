import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FractionalInchCalculatorPageRoutingModule } from './fractional-inch-calculator-routing.module';

import { FractionalInchCalculatorPage } from './fractional-inch-calculator.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FractionalInchCalculatorPageRoutingModule
  ],
  declarations: [FractionalInchCalculatorPage]
})
export class FractionalInchCalculatorPageModule {}
