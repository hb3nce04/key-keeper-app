import {Component, inject, input, InputSignal, output} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {Button, Column} from './table.type';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {BaseResponseDto} from '../../../core/dtos/base-response.dto';
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {NzSkeletonComponent} from 'ng-zorro-antd/skeleton';
import {TableCan} from '../../../core/types/role.type';

@Component({
  selector: 'app-table',
  imports: [
    NzTableComponent,
    NzButtonComponent,
    AsyncPipe,
    NzDividerModule,
    NzIconDirective,
    NzTooltipDirective,
    NzModalModule,
    NzPopconfirmDirective,
    NzSkeletonComponent,
  ],
  templateUrl: 'table.html',
  styles: `
    .buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
  `
})
export class Table<T extends BaseResponseDto> {
  protected loadingService: LoadingService = inject(LoadingService);
  private modalService: NzModalService = inject(NzModalService);

  columns: InputSignal<Column<T>[]> = input.required();
  buttons: InputSignal<Button[] | undefined> = input();
  data: InputSignal<T[]> = input.required();
  can: InputSignal<TableCan> = input.required();

  create = output<void>();
  edit = output<number>();
  delete = output<number>();

  getRenderedValue<T>(column: Column<T>, data: T | null | undefined): any {
    if (!data) {
      return "-";
    }
    if (column.field.toString().includes(".")) {
      return this.getNestedValue(data, column.field.toString());
    }
    if (column.valueFn) {
      return column.valueFn(data) ?? "-";
    }
    return (data as any)[column.field as keyof T] ?? "-";
  }

  private getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  handleView(data: T) {
    this.modalService.info({
      nzTitle: `Adatok #${data.id}`,
      nzContent: `${this.columns().map(column => `
            <div>
              <span>${column.header}:</span>
              <span>${this.getRenderedValue(column, data)}</span>
            </div>`).join('')}`,
      nzOkType: "default",
      nzOkText: "Bezárás"
    })
  }

  handleDelete(id: number) {
    this.delete.emit(id);
  }

  handleCreate() {
    this.create.emit();
  }

  handleEdit(id: number) {
    this.edit.emit(id);
  }
}
