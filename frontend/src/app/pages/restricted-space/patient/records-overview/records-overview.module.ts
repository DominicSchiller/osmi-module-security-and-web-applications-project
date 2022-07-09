import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordsOverviewPageRoutingModule } from './records-overview-routing.module';

import { RecordsOverviewPage } from './records-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordsOverviewPageRoutingModule
  ],
  declarations: [RecordsOverviewPage]
})
export class RecordsOverviewPageModule {}
