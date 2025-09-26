export interface FieldConfig {
  name: string;
  type: 'text' | 'password' | 'select' | 'email' | 'number' | 'checkbox';
  value?: string | number | boolean;
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
