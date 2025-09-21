import {Component, inject} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../../../core/enums/role.enum';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {UserService} from '../../user.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-user',
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
    </app-form>
  `
})
export class CreateUser {
  protected loadingService: LoadingService = inject(LoadingService);
  protected userService: UserService = inject(UserService);
  protected messageService: NzMessageService = inject(NzMessageService);

  fields: FieldConfig[] = [
    {
      name: 'username',
      label: 'Felhasználónév',
      type: 'text',
      icon: 'user',
      // TODO: maxhossz beállít
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
      name: 'role',
      label: 'Jogosultság',
      type: 'select',
      icon: 'user',
      options: Object.keys(Role).map(role => ({
        value: role,
        label: Role[role as keyof typeof Role],
      }) as Option),
      validators: [Validators.required]
    }
  ]

  handleSubmit(form: FormGroup) {
    const {username, email_address, role} = form.value;
    this.userService.create({username, email_address, role}).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen létrehozva! Az ideiglenes jelszó hamarosan kiküldésre kerül.")
      },
      error: () => {
        this.messageService.error("Hiba történt a felhasználó létrehozása során!");
      }
    })
  }
}
