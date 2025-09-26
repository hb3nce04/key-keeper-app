import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {RoleService} from '../../../core/services/role.service';

@Component({
  selector: 'app-home',
  template: `
    <h1>Üdvözöllek, {{ this.authService.getUsername() }}!</h1>
    <div>
      Jogosultságod: <b>{{ this.roleService.getRoleName(this.authService.isAdmin()) }}</b>
    </div>
  `,
  imports: [],
  styles: `
    h1 {
      text-align: center;
    }

    div {
      text-align: center;
    }
  `
})
export class Welcome {
  protected authService = inject(AuthService);
  protected roleService = inject(RoleService);
}
