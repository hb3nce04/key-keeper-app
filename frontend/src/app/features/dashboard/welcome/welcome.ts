import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Role} from '../../../core/enums/role.enum';
import {NzCardComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-home',
  template: `
    <h1>Szép napot, {{ this.authService.getUsername() }}!</h1>
    <nz-card>
      Jelenlegi jogosultságod: <b>{{ Role[this.authService.getRole()] }}</b>
    </nz-card>
  `,
  imports: [
    NzCardComponent
  ],
  styles: `
    h1 {
      text-align: center;
    }
  `
})
export class Welcome {
  protected authService = inject(AuthService);
  protected readonly Role = Role;
}
