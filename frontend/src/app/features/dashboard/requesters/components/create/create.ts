import {Component, inject} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {RequesterType} from '../../enums/requester.enum';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-create-requester',
  imports: [
    Form,
    AsyncPipe,
    NzButtonComponent
  ],
  template: `
    <app-form (validSubmit)="handleSubmit($event)" [fields]="fields">
      <button nz-button [nzType]="'primary'"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>`
})
export class CreateRequester {
  private drawerRef = inject(NzDrawerRef<CreateRequester>);
  protected loadingService: LoadingService = inject(LoadingService);

  fields: FieldConfig[] = [
    {
      name: 'lastName',
      label: 'Vezetéknév',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'firstName',
      label: 'Keresztnév',
      type: 'email',
      validators: [Validators.required],
    },
    {
      name: 'personalIdNumber',
      label: 'Személyi igazlvány szám',
      type: 'text'
    },
    {
      name: 'emailAddress',
      label: 'E-mail cím',
      type: 'email'
    },
    {
      name: 'phoneNumber',
      label: 'Telefonszám',
      type: 'text'
    },
    {
      name: 'type',
      label: 'Típus',
      type: 'select',
      options: Object.keys(RequesterType).map(type => ({
        value: type,
        label: RequesterType[type as keyof typeof RequesterType],
      }) as Option),
      validators: [Validators.required]
    }
  ]

  handleSubmit(form: FormGroup) {
    this.drawerRef.close();
  }
}
