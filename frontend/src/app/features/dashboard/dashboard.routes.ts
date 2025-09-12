import {Routes} from '@angular/router';
import {Records} from './records/records';
import {Rooms} from './rooms/rooms';
import {Keys} from './keys/keys';
import {Requesters} from './requesters/requesters';
import {Users} from './users/users';

export default [
  {path: 'records', component: Records, data: {breadcrumb: 'Nyilvántartás'}},
  {path: 'keys', component: Keys, data: {breadcrumb: 'Kulcsok'}},
  {path: 'rooms', component: Rooms, data: {breadcrumb: 'Helyiségek'}},
  {path: 'requesters', component: Requesters, data: {breadcrumb: 'Igénylők'}},
  {path: 'users', component: Users, data: {breadcrumb: 'Felhasználók'}}
] as Routes;
