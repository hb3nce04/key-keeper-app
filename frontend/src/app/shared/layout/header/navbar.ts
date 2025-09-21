import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NAV_LINKS} from '../../../core/constants/nav-link.const';
import {AuthService} from '../../../core/services/auth.service';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDrawerComponent, NzDrawerContentDirective} from 'ng-zorro-antd/drawer';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-layout-navbar',
  imports: [
    NzHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    RouterLinkActive,
    NzButtonComponent,
    NzIconDirective,
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzDividerComponent,
    NzPopconfirmDirective
  ],
  templateUrl: 'navbar.html',
  styleUrl: 'navbar.scss'
})
export class Navbar implements OnInit {
  protected readonly NAV_LINKS = NAV_LINKS;

  protected authService: AuthService = inject(AuthService);
  private message: NzMessageService = inject(NzMessageService);
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  isVisible: WritableSignal<boolean> = signal(true);

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset, '(min-width: 992px)'])
      .subscribe(result => {
        if (result.matches) {
          this.isVisible.set(false)
        }
      });
  }

  handleOpen(): void {
    this.isVisible.set(true)
  }

  handleClose(): void {
    this.isVisible.set(false)
  }

  handleLogout() {
    this.authService.logout();
    this.message.success("Sikeres kijelentkezés!")
  }
}
