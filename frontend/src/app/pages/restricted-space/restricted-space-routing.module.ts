import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestrictedSpacePage } from './restricted-space.page';

const routes: Routes = [
  {
    path: '',
    component: RestrictedSpacePage
  },
  {
    path: 'patient',
    loadChildren: () => import('./patient/patient-home/patient-home.module').then( m => m.PatientHomePageModule)
  },
  {
    path: 'representatives-overview',
    loadChildren: () => import('./patient/representatives-overview/representatives-overview.module').then( m => m.RepresentativesOverviewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedSpacePageRoutingModule {}
