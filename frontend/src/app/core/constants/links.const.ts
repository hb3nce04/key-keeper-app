import {Page} from '../types/page.type';

export const NAV_LINKS: {
  label: string;
  path: string;
  name: Page
}[] = [
  {label: 'Főoldal', path: '/dashboard/home', name: 'home'},
  {label: 'Nyilvántartás', path: '/dashboard/borrowings', name: 'borrowings'},
  {label: 'Kulcsok', path: '/dashboard/keys', name: 'keys'},
  {label: 'Helyiségek', path: '/dashboard/rooms', name: 'rooms'},
  {label: 'Igénylők', path: '/dashboard/requesters', name: 'requesters'},
  {label: 'Felhasználók', path: '/dashboard/users', name: 'users'},
]

export const MAIN_PAGE = '/dashboard/home'
export const LOGIN_PAGE = '/auth/login'
