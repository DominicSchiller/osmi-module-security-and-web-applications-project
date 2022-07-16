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
  },
  {
    path: 'records-overview',
    loadChildren: () => import('./patient/records-overview/records-overview.module').then( m => m.RecordsOverviewPageModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import('./doctor/doctor-home/doctor-home.module').then( m => m.DoctorHomePageModule)
  },
  {
    path: 'representative',
    loadChildren: () => import('./representative/representative-home/representative-home.module').then( m => m.RepresentativeHomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestrictedSpacePageRoutingModule {}
