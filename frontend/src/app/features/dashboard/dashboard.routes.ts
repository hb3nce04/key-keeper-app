import {Routes} from '@angular/router';
import {Borrowings} from './borrowings/borrowings';
import {Rooms} from './rooms/rooms';
import {Keys} from './keys/keys';
import {Requesters} from './requesters/requesters';
import {Users} from './users/users';
import {Welcome} from './welcome/welcome';

export default [
  {path: 'home', component: Welcome, data: {name: 'home', title: 'Főoldal'}},
  {path: 'borrowings', component: Borrowings, data: {name: 'borrowings', title: 'Nyilvántartás'}},
  {path: 'keys', component: Keys, data: {name: 'keys', title: 'Kulcsok'}},
  {path: 'rooms', component: Rooms, data: {name: 'rooms', title: 'Helyiségek'}},
  {path: 'requesters', component: Requesters, data: {name: 'requesters', title: 'Igénylők'}},
  {path: 'users', component: Users, data: {name: 'users', title: 'Felhasználók'}},
  { path: '', redirectTo: '/dashboard/borrowings', pathMatch: 'full'},
] as Routes;
