import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {KeycloakService as EpaKeycloakService} from "./services/keycloak/keycloak.service";

function initializeKeycloak(keycloak: KeycloakService, _: EpaKeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8181/',
        realm: 'epa-poc',
        clientId: 'epa-poc-frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
      loadUserProfileAtStartUp: true // load user information
    });
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
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
