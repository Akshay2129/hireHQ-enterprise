import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';

let activeRequests = 0;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const skipTokenUrls = ['login', 'signup', 'forgot-password', 'verify-email','new-password'];
  const shouldSkipToken = skipTokenUrls.some((url) => req.url.includes(url));

  let modifiedReq = req;

  if (isPlatformBrowser(platformId) && !shouldSkipToken) {
    const token = localStorage.getItem('authToken');
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      return next(req).pipe(finalize(() => finalizeLoader()));
    }
  }

  if (activeRequests === 0) {
    loadingService.showLoading();
    console.log('loading started .......');
  }

  activeRequests++;

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.clear();
        router.navigateByUrl('/auth/login');
      }
      return throwError(() => error);
    }),
    finalize(() => finalizeLoader())
  );

  function finalizeLoader() {
    activeRequests--;
    if (activeRequests === 0) {
      loadingService.hideLoading();
      console.log('loading ended .......');
    }
  }
};

