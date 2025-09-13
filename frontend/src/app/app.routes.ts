import {Routes} from '@angular/router';
import {Layout} from './shared/layout/layout';
import {NotFound} from './features/not-found/not-found';
import {AuthGuard} from './core/guards/auth.guard';

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
      link: '/dashboard/records'
    },
    component: Layout,
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  },
  { path: '', redirectTo: '/dashboard/records', pathMatch: 'full' },
  { path: '**', component: NotFound },
];
