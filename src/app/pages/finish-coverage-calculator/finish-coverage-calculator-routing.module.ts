import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishCoverageCalculatorPage } from './finish-coverage-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FinishCoverageCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishCoverageCalculatorPageRoutingModule {}
