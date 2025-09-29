import {Component, input, InputSignal} from '@angular/core';
import {Card} from './card/card';
import {CardType} from './card/card.type';
import {NzFlexDirective} from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-cards',
  template: `
    <div nz-flex nzGap="large" nzJustify="center">
      @for (card of this.cards(); track $index) {
        <app-card [title]="card.title" [content]="card.content"/>
      }
    </div>
  `,
  imports: [
    Card,
    NzFlexDirective
  ]
})
export class Cards {
  cards: InputSignal<CardType[]> = input.required();
}
