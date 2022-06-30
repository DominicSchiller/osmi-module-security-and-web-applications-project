import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {KeycloakService as EpaKeycloakService} from "./services/keycloak/keycloak.service";
import { AccessLevelInterceptor } from './interceptors/access-level.interceptor';

function initializeKeycloak(keycloak: KeycloakService, epaKeycloakService: EpaKeycloakService) {
  return () =>
   epaKeycloakService.refreshAccessLevel()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    KeycloakAngularModule,
    HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, EpaKeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AccessLevelInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
