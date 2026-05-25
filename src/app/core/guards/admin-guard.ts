import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/auth';


export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() &&
  authService.getUserType() === 'ADMIN') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
