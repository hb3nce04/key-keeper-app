import {Component, inject} from '@angular/core';

import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {BreadcrumbService} from '../../../core/services/breadcrumb.service';
import {AsyncPipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-layout-breadcrumb',
  imports: [NzBreadCrumbModule, AsyncPipe, RouterLink],
  template: `
    <nz-breadcrumb>
      @for (breadcrumb of (this.breadcrumbService.breadcrumbs$ | async); track $index) {
        <nz-breadcrumb-item>
          @if (!!breadcrumb.url) {
            <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          } @else {
            {{ breadcrumb.label }}
          }
        </nz-breadcrumb-item>
      }
    </nz-breadcrumb>
  `,
  styles: `
    nz-breadcrumb {
      margin-bottom: 10px;
    }
  `
})
export class Breadcrumb {
  protected breadcrumbService = inject(BreadcrumbService);
}
