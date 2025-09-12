import {Routes} from '@angular/router';
import {Records} from './records/records';
import {Rooms} from './rooms/rooms';

export default [
  {path: 'records', component: Records, data: {breadcrumb: 'Nyilvántartás'}},
  {path: 'rooms', component: Rooms, data: {breadcrumb: 'Helyiségek'}},
] as Routes;
