import {Component, input, InputSignal} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: 'error.html',
  imports: [
    RouterLink
  ],
  styleUrl: 'error.scss'
})
export class Error {
  code: InputSignal<number> = input.required();
  message: InputSignal<string> = input.required();
}
