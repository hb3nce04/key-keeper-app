import {computed, inject, Injectable, Signal} from '@angular/core';
import {AuthService} from './auth.service';
import {Can} from '../types/role.type';

@Injectable({providedIn: 'root'})
export class RoleService {
  private authService: AuthService = inject(AuthService);

  readonly privileges: Signal<Can> = computed(() => {
    const isAdmin = this.authService.isAdmin();

    return {
      home: {
        view: true
      },
      assignments: {
        create: isAdmin,
        update: isAdmin,
        delete: true,
        view: true,
      },
      keys: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
        view: true,
      },
      rooms: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
        view: isAdmin,
      },
      applicants: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
        view: true,
      },
      users: {
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
        view: isAdmin,
      },
    };
  });

  getRoleName(isAdmin: boolean): string {
    return isAdmin ? 'Adminisztrátor' : 'Felhasználó';
  }
}
