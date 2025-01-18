import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authEffects, authReducer, } from './store';
import { tokenInterceptor } from './service/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import 'ngx-toastr/toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor]), withFetch()),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({ auth: authReducer }),
    provideEffects([authEffects]),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideToastr(
      {
        timeOut: 2000,
        progressBar: true
      }
    ),
  ]
};
