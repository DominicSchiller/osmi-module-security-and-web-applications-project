import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepresentativesOverviewPageRoutingModule } from './representatives-overview-routing.module';

import { RepresentativesOverviewPage } from './representatives-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepresentativesOverviewPageRoutingModule
  ],
  declarations: [RepresentativesOverviewPage]
})
export class RepresentativesOverviewPageModule {}
