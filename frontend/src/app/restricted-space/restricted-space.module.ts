import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestrictedSpacePageRoutingModule } from './restricted-space-routing.module';

import { RestrictedSpacePage } from './restricted-space.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestrictedSpacePageRoutingModule
  ],
  declarations: [RestrictedSpacePage]
})
export class RestrictedSpacePageModule {}
