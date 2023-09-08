import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ShopService } from '../services/shop.service';

export const shopAuthGuard: CanActivateFn = (route, state) => {
  const shopService = inject(ShopService);
  const router = inject(Router);
  console.log('called');
  shopService.isLoginFunction().then((data) => {
    console.log('promise data', data);
  });
  
  return shopService
    .isLoginFunction()
    .then((d) => {
      return d;
    })
    .catch((err) => {
      router.navigate(['/shop/auth/sign-in']);
      return false;
    });
};
