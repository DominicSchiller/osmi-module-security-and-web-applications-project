import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestrictedSpacePage } from './restricted-space.page';

const routes: Routes = [
  {
    path: '',
    component: RestrictedSpacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedSpacePageRoutingModule {}
