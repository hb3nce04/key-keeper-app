import {Component, input} from '@angular/core';
import {NzCardComponent} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-card',
  template: `
    <nz-card [nzTitle]="title()">
      <p>{{ content() }}</p>
    </nz-card>
  `,
  imports: [
    NzCardComponent,
  ]
})
export class Card {
  title = input.required<string>();
  content = input.required<string>();
}
