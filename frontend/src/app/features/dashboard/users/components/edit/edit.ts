import {Component, Inject, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {UserService} from '../../user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';

@Component({
  selector: 'app-edit-user',
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
    </app-form>
  `
})
export class EditUser implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditUser>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected userService: UserService = inject(UserService);
  protected messageService: NzMessageService = inject(NzMessageService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

  fields: FieldConfig[] = [
    {
      name: 'username',
      label: 'Felhasználónév',
      type: 'text',
      icon: 'user',
      maxlength: 15,
      validators: [Validators.required],
    },
    {
      name: 'email_address',
      label: 'E-mail cím',
      type: 'email',
      icon: 'mail',
      validators: [Validators.required, Validators.email],
    },
    {
      name: 'isAdmin',
      label: 'Adminisztrátor',
      type: 'checkbox'
    },
    {
      name: 'isDisabled',
      label: 'Letiltott',
      type: 'checkbox'
    }
  ]

  ngOnInit(): void {
    this.userService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'username') {
            field.value = data.username
          }
          if (field.name === 'email_address') {
            field.value = data.emailAddress
          }
          if (field.name === 'isAdmin') {
            field.value = data.isAdmin
          }
          if (field.name === 'isDisabled') {
            field.value = data.isDisabled
          }
        })
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {username, email_address, isAdmin, isDisabled} = form.value;
    this.userService.put(this.drawerData.id, {username, emailAddress: email_address, isAdmin: !!isAdmin, isDisabled}).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
