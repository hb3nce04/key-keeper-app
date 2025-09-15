import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NAV_LINKS} from '../../../core/constants/nav-link.const';
import {AuthService} from '../../../core/services/auth.service';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzDrawerComponent, NzDrawerContentDirective} from 'ng-zorro-antd/drawer';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NzDividerComponent} from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-layout-header',
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
    NzDividerComponent
  ],
  templateUrl: 'header.html',
  styleUrl: 'header.scss'
})
export class Header implements OnInit {
  protected readonly NAV_LINKS = NAV_LINKS;

  protected authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
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
    this.router.navigate(['/auth/login']);
    this.message.success("Sikeres kijelentkezés!")
  }
}
