import {Component} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Header} from './header/header';
import {Breadcrumb} from './breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    RouterOutlet,
    Header,
    Breadcrumb,
  ],
  template: `
    <nz-layout class="app-layout">
      <app-layout-header/>
      <nz-content>
        <app-layout-breadcrumb/>
        <div class="inner-content">
          <router-outlet></router-outlet>
        </div>
      </nz-content>
    </nz-layout>
  `,
  styles: `
    .app-layout {
      height: 100vh;
    }
    nz-content {
      padding: 24px 50px;
    }
    .inner-content {
      padding: 24px;
      background: #fff;
      height: calc(100% - 10px - 5%);
    }
  `
})
export class Layout {}
