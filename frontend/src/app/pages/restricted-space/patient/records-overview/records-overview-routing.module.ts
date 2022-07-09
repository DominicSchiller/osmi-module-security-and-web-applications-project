import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsOverviewPage } from './records-overview.page';

const routes: Routes = [
  {
    path: '',
    component: RecordsOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsOverviewPageRoutingModule {}
