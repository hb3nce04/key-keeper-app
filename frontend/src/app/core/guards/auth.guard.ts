import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {LOGIN_PAGE, MAIN_PAGE} from '../constants/nav-link.const';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const authRequired = route?.data['authRequired'] ?? true;

    if (authRequired && !this.authService.isLoggedIn()) {
      return this.router.createUrlTree([LOGIN_PAGE]);
    }

    if (!authRequired && this.authService.isLoggedIn()) {
      return this.router.createUrlTree([MAIN_PAGE]);
    }

    return true;
  }
}
