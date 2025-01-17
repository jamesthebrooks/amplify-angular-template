import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FinishCoverageCalculatorPageRoutingModule } from './finish-coverage-calculator-routing.module';
import { FinishCoverageCalculatorPage } from './finish-coverage-calculator.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishCoverageCalculatorPageRoutingModule
  ],
  declarations: [FinishCoverageCalculatorPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FinishCoverageCalculatorPageModule {}
