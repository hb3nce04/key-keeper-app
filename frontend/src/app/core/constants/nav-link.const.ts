export const NAV_LINKS = [
  {label: 'Nyilvántartás', path: '/dashboard/borrowings'}, // authz: user
  {label: 'Kulcsok', path: '/dashboard/keys'}, // authz: admin
  {label: 'Helyiségek', path: '/dashboard/rooms'}, // authz: admin
  {label: 'Igénylők', path: '/dashboard/requesters'}, // authz: user
  {label: 'Felhasználók', path: '/dashboard/users'}, // authz: admin
]

export const MAIN_PAGE = '/dashboard/borrowings'
export const LOGIN_PAGE = '/auth/login'
