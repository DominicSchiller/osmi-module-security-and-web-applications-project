import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepresentativeHomePage } from './representative-home.page';

const routes: Routes = [
  {
    path: '',
    component: RepresentativeHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepresentativeHomePageRoutingModule {}
