import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RequesterService} from './requester.service';
import {Table} from '../../../shared/components/table/table';
import {Column} from '../../../shared/components/table/table.type';
import {RequesterDto} from './requester.dto';
import {RequesterType} from './requester.enum';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-requesters',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)"/>
  `
})
export class Requesters implements OnInit {
  private service: RequesterService = inject(RequesterService);
  private message: NzMessageService = inject(NzMessageService);

  columns: Column<RequesterDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (value: RequesterDto) => `${value.firstName} ${value.lastName}`
    },
    {
      field: 'personalIdNumber',
      header: 'Személy igazolvány szám'
    },
    {
      field: 'emailAddress',
      header: 'E-mail cím'
    },
    {
      field: 'phoneNumber',
      header: 'Telefonszám'
    },
    {
      field: 'type',
      header: 'Típus',
      valueFn: (dto: RequesterDto) => RequesterType[dto.type as unknown as keyof typeof RequesterType]
    }
  ]
  data: WritableSignal<RequesterDto[]> = signal([])

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (data: RequesterDto[]) => {
        this.data.set(data)
      },
    })
  }

  handleDelete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.message.success("Igénylő sikeresen törölve!")
        this.data.set(this.data().filter(d => d.id !== id))
      }
    })
  }
}
