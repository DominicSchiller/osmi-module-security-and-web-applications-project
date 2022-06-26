import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { KeycloakGuard } from './guards/keycloak.guard';

const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'restricted-space',
    canActivate: [KeycloakGuard],
    loadChildren: () => import('./pages/restricted-space/restricted-space.module').then( m => m.RestrictedSpacePageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
