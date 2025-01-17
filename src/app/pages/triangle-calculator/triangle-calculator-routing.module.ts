import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriangleCalculatorPage } from './triangle-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: TriangleCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriangleCalculatorPageRoutingModule {}
