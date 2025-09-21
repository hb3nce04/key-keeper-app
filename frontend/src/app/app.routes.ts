import {Routes} from '@angular/router';
import {Layout} from './shared/layout/layout';
import {NotFound} from './features/not-found/not-found';
import {AuthGuard} from './core/guards/auth.guard';
import {MAIN_PAGE} from './core/constants/links.const';

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
    data: {
      breadcrumb: 'Főoldal',
      link: MAIN_PAGE
    },
    component: Layout,
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  },
  { path: '', redirectTo: MAIN_PAGE, pathMatch: 'full' },
  { path: '**', component: NotFound },
];
