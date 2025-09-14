export interface Column<T> {
  header: string;
  field: keyof T | string;
  valueFn?: (value: any) => any;
}
