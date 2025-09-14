import {Routes} from '@angular/router';
import {Borrowings} from './borrowings/borrowings';
import {Rooms} from './rooms/rooms';
import {Keys} from './keys/keys';
import {Requesters} from './requesters/requesters';
import {Users} from './users/users';

export default [
  {path: 'borrowings', component: Borrowings, data: {breadcrumb: 'Nyilvántartás'}},
  {path: 'keys', component: Keys, data: {breadcrumb: 'Kulcsok'}},
  {path: 'rooms', component: Rooms, data: {breadcrumb: 'Helyiségek'}},
  {path: 'requesters', component: Requesters, data: {breadcrumb: 'Igénylők'}},
  {path: 'users', component: Users, data: {breadcrumb: 'Felhasználók'}},
  { path: '', redirectTo: '/dashboard/borrowings', pathMatch: 'full' },
] as Routes;
