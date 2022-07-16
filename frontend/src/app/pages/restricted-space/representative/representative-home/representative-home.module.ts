import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepresentativeHomePageRoutingModule } from './representative-home-routing.module';

import { RepresentativeHomePage } from './representative-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepresentativeHomePageRoutingModule
  ],
  declarations: [RepresentativeHomePage]
})
export class RepresentativeHomePageModule {}
