import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitsConverterPage } from './units-converter.page';

const routes: Routes = [
  {
    path: '',
    component: UnitsConverterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsConverterPageRoutingModule {}
