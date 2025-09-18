import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {UserService} from './user.service';
import {Column} from '../../../shared/components/table/table.type';
import {UserDto} from './user.dto';
import {Role} from '../../../core/enums/role.enum';

@Component({
  selector: 'app-users',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()"/>
  `
})
export class Users implements OnInit {
  private service: UserService = inject(UserService);

  columns: Column<UserDto>[] = [
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
      valueFn: (dto: UserDto) => Role[dto.role as unknown as keyof typeof Role]
    }
  ]
  data: WritableSignal<UserDto[]> = signal([])

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: UserDto[]) => {
        this.data.set(data)
      },
    })
  }

}
