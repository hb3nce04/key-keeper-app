import {Component, inject} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {ApplicantService} from '../../applicant.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApplicantType} from '../../enums/applicant.enum';

@Component({
  selector: 'app-create-applicant',
  imports: [
    Form,
    AsyncPipe,
    NzButtonComponent
  ],
  template: `
    <app-form (validSubmit)="handleSubmit($event)" [fields]="fields">
      <button nz-button nzType="primary"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>`
})
export class CreateApplicant {
  private drawerRef = inject(NzDrawerRef<CreateApplicant>);
  protected loadingService: LoadingService = inject(LoadingService);
  private applicantService: ApplicantService = inject(ApplicantService);
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
      label: 'Személyi igazolvány szám',
      validators: [Validators.pattern("\\d{6}[A-Z]{2}$")],
      extra: 'pl: 123456AB',
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
      type: 'text',
      validators: [Validators.pattern("^(?:\\+36|06)?\\s?(20|30|31|70)\\s?\\d{3}\\s?\\d{4}$")],
    },
    {
      name: 'type',
      label: 'Típus',
      type: 'select',
      options: Object.keys(ApplicantType).map(type => ({
        value: type,
        label: ApplicantType[type as keyof typeof ApplicantType],
      }) as Option),
      validators: [Validators.required]
    }
  ]

  handleSubmit(form: FormGroup) {
    const {lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type} = form.value;
    this.applicantService.create({lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type}).subscribe({
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
