import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FractionalInchCalculatorComponent
} from "./components/fractional-inch-calculator/fractional-inch-calculator.component";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [
    FractionalInchCalculatorComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FractionalInchCalculatorComponent
  ]
})
export class SharedModule {
}
