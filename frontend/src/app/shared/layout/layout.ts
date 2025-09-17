import {Component} from '@angular/core';
import {NzContentComponent, NzFooterComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './header/navbar';
import {Breadcrumb} from './breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    RouterOutlet,
    Navbar,
    Breadcrumb,
    NzFooterComponent,
  ],
  templateUrl: 'layout.html',
  styleUrl: 'layout.scss',
})
export class Layout {
  protected readonly date = new Date();
}
