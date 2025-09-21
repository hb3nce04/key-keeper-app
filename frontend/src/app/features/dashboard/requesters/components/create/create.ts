import {Component, inject} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {RequesterType} from '../../enums/requester.enum';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {RequesterService} from '../../requester.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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
  private requesterService: RequesterService = inject(RequesterService);
  private messageService: NzMessageService = inject(NzMessageService);

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
      type: 'number'
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
    const {lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type} = form.value;
    this.requesterService.create({lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type}).subscribe({
      next: () => {
        this.messageService.success("Igénylő sikeresen létrehozva!")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt az igénylő létrehozása során!");
      }
    })
  }
}
