import {Component} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from 'ng-zorro-antd/layout';
import {RouterOutlet} from '@angular/router';
import {Navbar} from './navbar/navbar';
import {Breadcrumb} from './breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    RouterOutlet,
    Navbar,
    Breadcrumb
  ],
  templateUrl: 'layout.html',
  styleUrl: 'layout.scss',
})
export class Layout {
}
