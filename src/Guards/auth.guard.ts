import { CanActivateFn, Router } from '@angular/router';
import { AuthGuardService } from '../Services/AuthService/AuthGuard.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthGuardService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } 
  else {
    router.navigate(['/userlogin']);
    return false;
  }
};
