import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardFootCalculatorPage } from './board-foot-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: BoardFootCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardFootCalculatorPageRoutingModule {}
