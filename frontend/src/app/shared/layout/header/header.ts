import {Component} from '@angular/core';
import {NzHeaderComponent} from 'ng-zorro-antd/layout';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NAV_LINKS} from '../../../core/constants/nav-link.const';

@Component({
  selector: 'app-layout-header',
  imports: [
    NzHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <nz-header>
      <div class="logo">
        <a routerLink="/">
          <img src="assets/icon.png" alt="logo">
          <h1>Kulcsnyilvántartó rendszer</h1>
        </a>
      </div>
      <ul nz-menu class="top-nav" nzTheme="dark" nzMode="horizontal">
        @for (link of NAV_LINKS; track $index) {
          <li nz-menu-item routerLinkActive="ant-menu-item-selected" [routerLink]="link.path">{{ link.label }}</li>
        }
      </ul>
    </nz-header>
  `,
  styles: `
    .top-nav {
      line-height: 64px;
    }
    .logo {
      float: left;
      height: 64px;
      padding-right: 24px;
      line-height: 64px;
      background: #001529;
    }
    .logo img {
      display: inline-block;
      height: 32px;
      width: 32px;
      vertical-align: middle;
    }
    .logo h1 {
      display: inline-block;
      margin: 0 0 0 15px;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
      vertical-align: middle;
    }
  `
})
export class Header {
  protected readonly NAV_LINKS = NAV_LINKS;
}
