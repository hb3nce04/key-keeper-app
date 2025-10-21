import {
  Component,
  ContentChild,
  inject,
  input,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef
} from '@angular/core';
import {FieldConfig} from './form.type';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzRowDirective} from 'ng-zorro-antd/grid';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzCheckboxComponent} from 'ng-zorro-antd/checkbox';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTimePickerComponent} from 'ng-zorro-antd/time-picker';
import {NzRadioComponent, NzRadioGroupComponent} from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-form',
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzRowDirective,
    NzInputGroupComponent,
    NzInputDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzCheckboxComponent,
    NzDatePickerModule,
    NzTimePickerComponent,
    NzRadioGroupComponent,
    NzRadioComponent
  ],
  templateUrl: 'form.html'
})
export class Form implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup
  fields: ModelSignal<FieldConfig[]> = model.required();
  validSubmit: OutputEmitterRef<FormGroup> = output()

  class = input();

  @ContentChild('submitButton') customButton: any;

  ngOnInit(): void {
    const group: any = {};
    this.fields().forEach((field: FieldConfig) => {
      group[field.name] = [field.value, field.validators || []];
    });
    this.formGroup = this.formBuilder.group(group)
  }

  setValue(field: FieldConfig, value: any): void {
    this.formGroup.get(field.name)?.setValue(value);
  }

  handleSubmit() {
    if (!this.formGroup.dirty) return;
    if (this.formGroup.valid) {
      this.validSubmit.emit(this.formGroup);
    } else {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  protected readonly Validators = Validators;
}
