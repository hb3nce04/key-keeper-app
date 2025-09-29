import {Component, inject, OnInit, Signal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {UserService} from './user.service';
import {Column} from '../../../shared/components/table/table.type';
import {UserResponseDto} from './dtos/user-response.dto';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateUser} from './components/create/create';
import {toSignal} from '@angular/core/rxjs-interop';
import {EditUser} from './components/edit/edit';
import {RoleService} from '../../../core/services/role.service';
import {TableCan} from '../../../core/types/role.type';
import {ApiErrorResponseDto} from '../../../core/dtos/api-error-response.dto';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()" (edit)="handleEdit($event)" [can]="can"/>
  `
})
export class Users implements OnInit {
  private userService: UserService = inject(UserService);
  private roleService: RoleService = inject(RoleService);
  private messageService: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

  columns: Column<UserResponseDto>[] = [
    {
      field: 'username',
      header: 'Felhasználónév',
    },
    {
      field: 'emailAddress',
      header: 'E-mail cím',
    },
    {
      field: 'role',
      header: 'Jogosultság',
      valueFn: (dto: UserResponseDto) => this.roleService.getRoleName(dto.isAdmin)
    },
    {
      field: 'is_disabled',
      header: 'Letiltott',
      valueFn: (dto: UserResponseDto) => dto.isDisabled ? "Igen" : "Nem"
    }
  ]
  data: Signal<UserResponseDto[]> = toSignal(this.userService.data$, {initialValue: [] as UserResponseDto[]});
  can: TableCan = this.roleService.privileges().users

  ngOnInit(): void {
    this.userService.findAll()
  }

  handleDelete(id: number) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen törölve!")
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: "Új felhasználó hozzáadása",
      nzContent: CreateUser
    })
  }

  handleEdit(id: number) {
    this.drawerService.create({
      nzTitle: "Felhasználó módosítása",
      nzContent: EditUser,
      nzData: {
        id
      }
    })
  }
}
