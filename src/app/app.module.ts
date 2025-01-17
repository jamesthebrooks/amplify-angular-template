import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterLink} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgIf} from "@angular/common";
import {HttpClient, provideHttpClient} from "@angular/common/http";
import {
  CustomTranslationsLoaderService
} from './core/services/custom-translations-loader-service/custom-translations-loader.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import {AmplifyAuthenticatorModule} from "@aws-amplify/ui-angular";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AmplifyAuthenticatorModule,
    IonicModule.forRoot(), AppRoutingModule, IonicModule, NgIf, RouterLink, TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslationsLoaderService,
        deps: [HttpClient],
      },
    }), ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
}),],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {
}
