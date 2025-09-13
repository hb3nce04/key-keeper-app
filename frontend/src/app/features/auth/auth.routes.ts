import {Routes} from '@angular/router';
import {Login} from './login/login';

export default [
  {path: 'login', component: Login},
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},
] as Routes;
