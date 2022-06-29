import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientHomePage } from './patient-home.page';

const routes: Routes = [
  {
    path: '',
    component: PatientHomePage
  },
  {
    path: 'insurance-details',
    loadChildren: () => import('./../insurance-details/insurance-details.module').then( m => m.InsuranceDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientHomePageRoutingModule {}