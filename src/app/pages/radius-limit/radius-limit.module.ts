import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RadiusLimitPageRoutingModule } from './radius-limit-routing.module';

import { RadiusLimitPage } from './radius-limit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RadiusLimitPageRoutingModule
  ],
  declarations: [RadiusLimitPage]
})
export class RadiusLimitPageModule {}
