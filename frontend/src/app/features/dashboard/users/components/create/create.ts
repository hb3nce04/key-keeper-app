import {Component, inject} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {UserService} from '../../user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-create-user',
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
export class CreateUser {
  private drawerRef = inject(NzDrawerRef<CreateUser>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected userService: UserService = inject(UserService);
  protected messageService: NzMessageService = inject(NzMessageService);

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
    }
  ]

  handleSubmit(form: FormGroup) {
    const {username, email_address, isAdmin} = form.value;
    this.userService.create({username, email_address, isAdmin: !!isAdmin}).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen létrehozva! Az ideiglenes jelszó hamarosan kiküldésre kerül.")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt a felhasználó létrehozása során!");
      }
    })
  }
}
