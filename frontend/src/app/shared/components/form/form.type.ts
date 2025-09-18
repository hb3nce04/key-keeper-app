export interface FieldConfig {
  name: string;
  type: 'text' | 'password' | 'select';
  value?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  validators?: any[];
  options?: Option[];
  extra?: string
}

export interface Option {
  label: string;
  value: string | number;
}
