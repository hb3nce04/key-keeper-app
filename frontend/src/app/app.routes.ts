import {Routes} from '@angular/router';
import {Layout} from './shared/layout/layout';
import {NotFound} from './features/not-found/not-found';
import {AuthGuard} from './core/guards/auth.guard';
import {MAIN_PAGE} from './core/constants/links.const';
import {RoleGuard} from './core/guards/role.guard';
import {Forbidden} from './features/forbidden/forbidden';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    data: {
      authRequired: false
    },
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [RoleGuard],
    component: Layout,
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  },
  {
    path: 'forbidden',
    component: Forbidden,
  },
  { path: '', redirectTo: MAIN_PAGE, pathMatch: 'full' },
  { path: '**', component: NotFound },
];
