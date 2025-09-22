import {Component, Inject, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {Role} from '../../../../../core/enums/role.enum';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {UserService} from '../../user.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';

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

  ngOnInit(): void {
    this.userService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'username') {
            field.value = data.username
          }
          if (field.name === 'email_address') {
            field.value = data.email_address
          }
          if (field.name === 'role') {
            field.value = data.role
          }
        })
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {username, email_address, role} = form.value;
    this.userService.update(this.drawerData.id, {username, email_address, role}).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt a felhasználó módosítása során!");
      }
    })
  }
}
