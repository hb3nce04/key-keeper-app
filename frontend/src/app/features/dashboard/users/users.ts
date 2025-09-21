import {Component, inject, OnInit} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {UserService} from './user.service';
import {Column} from '../../../shared/components/table/table.type';
import {UserResponseDto} from './dtos/user-response.dto';
import {Role} from '../../../core/enums/role.enum';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateUser} from './components/create/create';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()"/>
  `
})
export class Users implements OnInit {
  private userService: UserService = inject(UserService);
  private messageService: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

  columns: Column<UserResponseDto>[] = [
    {
      field: 'username',
      header: 'Felhasználónév',
    },
    {
      field: 'email_address',
      header: 'E-mail cím',
    },
    {
      field: 'role',
      header: 'Jogosultság',
      valueFn: (dto: UserResponseDto) => Role[dto.role as unknown as keyof typeof Role]
    }
  ]
  data = toSignal(this.userService.data$, {initialValue: [] as UserResponseDto[]});

  ngOnInit(): void {
    this.userService.findAll()
  }

  handleDelete(id: number) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.messageService.success("Felhasználó sikeresen törölve!")
      }
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: "Új felhasználó hozzáadása",
      nzContent: CreateUser
    })
  }
}
