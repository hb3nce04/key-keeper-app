import {Routes} from '@angular/router';
import {Assignments} from './assignments/assignments';
import {Rooms} from './rooms/rooms';
import {Keys} from './keys/keys';
import {Users} from './users/users';
import {Welcome} from './welcome/welcome';
import {Applicants} from './applicants/applicants';

export default [
  {path: 'home', component: Welcome, data: {name: 'home', title: 'Főoldal'}},
  {path: 'assignments', component: Assignments, data: {name: 'assignments', title: 'Nyilvántartás'}},
  {path: 'keys', component: Keys, data: {name: 'keys', title: 'Kulcsok'}},
  {path: 'rooms', component: Rooms, data: {name: 'rooms', title: 'Helyiségek'}},
  {path: 'applicants', component: Applicants, data: {name: 'applicants', title: 'Igénylők'}},
  {path: 'users', component: Users, data: {name: 'users', title: 'Felhasználók'}},
  { path: '', redirectTo: '/dashboard/assignments', pathMatch: 'full'},
] as Routes;
