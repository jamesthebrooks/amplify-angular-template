import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriangleCalculatorPageRoutingModule } from './triangle-calculator-routing.module';

import { TriangleCalculatorPage } from './triangle-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriangleCalculatorPageRoutingModule
  ],
  declarations: [TriangleCalculatorPage]
})
export class TriangleCalculatorPageModule {}
