import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }
  }
  return true;
};

export const loginGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const token = sessionStorage.getItem('access_token');
    if (token && token !== '') {
      router.navigate(['/home']);
      return false;
    }
  }
  return true;
};
