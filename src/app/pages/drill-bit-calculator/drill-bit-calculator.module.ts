import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrillBitCalculatorPageRoutingModule } from './drill-bit-calculator-routing.module';

import { DrillBitCalculatorPage } from './drill-bit-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrillBitCalculatorPageRoutingModule
  ],
  declarations: [DrillBitCalculatorPage]
})
export class DrillBitCalculatorPageModule {}
