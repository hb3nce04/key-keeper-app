export interface FieldConfig {
  name: string;
  type: 'text' | 'password';
  value?: string;
  label?: string;
  placeholder?: string;
  icon?: string;
  validators?: any[];
}
