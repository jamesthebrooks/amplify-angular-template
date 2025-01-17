import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrillBitCalculatorPage } from './drill-bit-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: DrillBitCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrillBitCalculatorPageRoutingModule {}
