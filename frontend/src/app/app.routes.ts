import {Routes} from '@angular/router';
import {Layout} from './shared/layout/layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes')
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Főoldal'
    },
    component: Layout,
    loadChildren: () => import('./features/dashboard/dashboard.routes')
  }
];
