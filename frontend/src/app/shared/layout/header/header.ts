import {Component, inject} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NAV_LINKS} from '../../../core/constants/nav-link.const';
import {AuthService} from '../../../core/services/auth.service';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-layout-header',
  imports: [
    NzHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    RouterLinkActive,
    NzButtonComponent
  ],
  templateUrl: 'header.html',
  styleUrl: 'header.scss'
})
export class Header {
  protected authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private message: NzMessageService = inject(NzMessageService);

  protected readonly NAV_LINKS = NAV_LINKS;

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.message.success("Sikeres kijelentkezés!")
  }
}
