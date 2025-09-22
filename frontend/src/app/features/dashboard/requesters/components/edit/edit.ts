import {Component, Inject, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {RequesterType} from '../../enums/requester.enum';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {RequesterService} from '../../requester.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-requester',
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
export class EditRequester implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditRequester>);
  protected loadingService: LoadingService = inject(LoadingService);
  private requesterService: RequesterService = inject(RequesterService);
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

  ngOnInit(): void {
    this.requesterService.findById(this.drawerData.id).subscribe(
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
    this.requesterService.update(this.drawerData.id, {lastName, firstName, personalIdNumber, emailAddress, phoneNumber, type}).subscribe({
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
