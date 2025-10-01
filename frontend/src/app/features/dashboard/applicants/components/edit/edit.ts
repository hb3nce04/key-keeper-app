import {Component, Inject, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {ApplicantService} from '../../applicant.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApplicantType} from '../../enums/applicant.enum';

@Component({
  selector: 'app-edit-applicant',
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
export class EditApplicant implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditApplicant>);
  protected loadingService: LoadingService = inject(LoadingService);
  private applicantService: ApplicantService = inject(ApplicantService);
  private messageService: NzMessageService = inject(NzMessageService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

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

  ngOnInit(): void {
    this.applicantService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'lastName') {
            field.value = data.lastName
          }
          if (field.name === 'firstName') {
            field.value = data.firstName
          }
          if (field.name === 'personalIdNumber') {
            field.value = data.personalIdNumber
          }
          if (field.name === 'emailAddress') {
            field.value = data.emailAddress
          }
          if (field.name === 'phoneNumber') {
            field.value = data.phoneNumber
          }
          if (field.name === 'type') {
            field.value = data.type
          }
        })
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type} = form.value;
    this.applicantService.put(this.drawerData.id, {lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type}).subscribe({
      next: () => {
        this.messageService.success("Igénylő sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt az igénylő módosítása során!");
      }
    })
  }
}
