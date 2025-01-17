import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoardFootCalculatorPageRoutingModule } from './board-foot-calculator-routing.module';

import { BoardFootCalculatorPage } from './board-foot-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardFootCalculatorPageRoutingModule
  ],
  declarations: [BoardFootCalculatorPage]
})
export class BoardFootCalculatorPageModule {}
