import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const authRequired = route?.data['authRequired'] ?? true;

    if (authRequired && !this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/auth/login']);
    }

    if (!authRequired && this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/dashboard/records']);
    }

    return true;
  }
}
