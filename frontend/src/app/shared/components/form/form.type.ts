export interface FieldConfig {
  name: string;
  type: 'text' | 'password' | 'select' | 'email' | 'number';
  value?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  validators?: any[];
  options?: Option[];
  extra?: string,
  showSearch?: boolean;
}

export interface Option {
  label: string;
  value: string | number;
}
