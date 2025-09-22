import {NzButtonType} from 'ng-zorro-antd/button';

export interface Column<T> {
  header: string;
  field: keyof T | string;
  valueFn?: (value: any) => any;
}

export interface Button {
  label: string;
  type?: NzButtonType;
  icon: string;
  click: (data: any) => void;
}
