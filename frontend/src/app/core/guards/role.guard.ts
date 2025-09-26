import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree} from '@angular/router';
import {RoleService} from '../services/role.service';
import {Page} from '../types/page.type';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  private roleService: RoleService = inject(RoleService);
  private router: Router = inject(Router);

  canActivateChild(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const routeName: Page = route?.data['name'];
    const hasAccess = this.roleService.privileges()[routeName].view;

    if (!hasAccess) {
      return this.router.createUrlTree(['/forbidden']);
    }

    return hasAccess;
  }
}
