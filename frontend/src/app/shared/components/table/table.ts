import {Component, inject, input, InputSignal} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Button, Column} from './table.type';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    NzTableComponent,
    NzButtonComponent,
    AsyncPipe
  ],
  templateUrl: 'table.html'
})
export class Table<T> {
  protected loadingService: LoadingService = inject(LoadingService);

  columns: InputSignal<Column<T>[]> = input.required();
  buttons: InputSignal<Button[] | undefined> = input();
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
