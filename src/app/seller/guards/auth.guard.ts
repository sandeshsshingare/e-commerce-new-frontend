import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  CanActivateChildFn,
  Router,
  CanDeactivateFn,
} from '@angular/router';

import { AuthService } from '../auth/authServices/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const router = inject(Router);
  _auth.isLoggedIn().then((data: any) => {
    console.log(data?.isAccess + ' is access');
    return data?.isAccess;
  });

  return true;
};

export const authGuardChild: CanActivateChildFn = (route, state) => {
  const _auth = inject(AuthService);
  const router = inject(Router);
  _auth.isLoggedIn().then((data: any) => {
    console.log(data?.isAccess + ' is access');
    return data?.isAccess;
  });

  return true;
};
