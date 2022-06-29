import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepresentativesOverviewPage } from './representatives-overview.page';

const routes: Routes = [
  {
    path: '',
    component: RepresentativesOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepresentativesOverviewPageRoutingModule {}
