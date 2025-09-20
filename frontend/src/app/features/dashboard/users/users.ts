import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {UserService} from './user.service';
import {Column} from '../../../shared/components/table/table.type';
import {UserDto} from './user.dto';
import {Role} from '../../../core/enums/role.enum';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-users',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)"/>
  `
})
export class Users implements OnInit {
  private service: UserService = inject(UserService);
  private message: NzMessageService = inject(NzMessageService);

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
    this.service.findAll().subscribe({
      next: (data: UserDto[]) => {
        this.data.set(data)
      },
    })
  }

  handleDelete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.message.success("Felhasználó sikeresen törölve!")
        this.data.set(this.data().filter(d => d.id !== id))
      }
    })
  }
}
