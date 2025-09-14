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

  getRenderedValue(column: Column<T>, data: T) {
    if (column.field.toString().includes('.')) {
      return this.getNestedValue(data, column.field.toString());
    }
    if (!!column.valueFn) {
      return column.valueFn(data[column.field as keyof T]);
    } else {
      return data[column.field as keyof T];
    }
  }

  private getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }
}
