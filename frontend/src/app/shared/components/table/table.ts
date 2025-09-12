import {Component, input, InputSignal} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {Column} from './table.type';

@Component({
  selector: 'app-table',
  imports: [
    NzTableComponent,
    NzDividerComponent
  ],
  templateUrl: 'table.html'
})
export class Table<T> {
  columns: InputSignal<Column<T>[]> = input.required();
  data: InputSignal<T[]> = input.required();
}
