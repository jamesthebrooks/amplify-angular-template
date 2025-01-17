import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FractionalInchCalculatorPage } from './fractional-inch-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FractionalInchCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FractionalInchCalculatorPageRoutingModule {}
