import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let isLogin = authService.userData.getValue();
  let navigate = inject(Router);

  if(isLogin){
    return true
  }else {
    return navigate.navigate(['/login'])
  }
};
