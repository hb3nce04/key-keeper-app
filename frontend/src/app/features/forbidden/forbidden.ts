import {Component} from '@angular/core';
import {Error} from '../../shared/components/error/error';

@Component({
  selector: 'app-forbidden',
  imports: [
    Error
  ],
  template: `
    <app-error [code]="403" message="Hozzáférés megtagadva."/>
  `
})
export class Forbidden {
}
