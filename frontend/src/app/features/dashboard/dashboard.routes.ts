import {Routes} from '@angular/router';
import {Borrowings} from './borrowings/borrowings';
import {Rooms} from './rooms/rooms';
import {Keys} from './keys/keys';
import {Requesters} from './requesters/requesters';
import {Users} from './users/users';
import {Welcome} from './welcome/welcome';

export default [
  {path: 'home', component: Welcome, data: {title: 'Főoldal'}},
  {path: 'borrowings', component: Borrowings, data: {title: 'Nyilvántartás'}},
  {path: 'keys', component: Keys, data: {title: 'Kulcsok'}},
  {path: 'rooms', component: Rooms, data: {title: 'Helyiségek'}},
  {path: 'requesters', component: Requesters, data: {title: 'Igénylők'}},
  {path: 'users', component: Users, data: {title: 'Felhasználók'}},
  { path: '', redirectTo: '/dashboard/borrowings', pathMatch: 'full' },
] as Routes;
