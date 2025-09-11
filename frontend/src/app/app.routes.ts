import {Routes} from '@angular/router';
import {Login} from './pages/login/login';
import {Layout} from './shared/layout/layout';
import {Dashboard} from './pages/dashboard/dashboard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: Login},
  {
    path: 'dashboard',
    component: Layout,
    children: [
      {path: '', component: Dashboard},
    ]
  }
];
