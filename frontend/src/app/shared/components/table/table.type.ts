export interface Column<T> {
  header: string;
  field: keyof T;
  valueFn?: (value: any) => any;
}
