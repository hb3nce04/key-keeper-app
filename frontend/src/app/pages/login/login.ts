import {Component, inject} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  templateUrl: 'login.html',
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzButtonComponent,
    NzInputDirective
  ]
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true)
  });

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
