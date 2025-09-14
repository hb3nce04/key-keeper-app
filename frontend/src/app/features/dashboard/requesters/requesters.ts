import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RequesterService} from './requester.service';
import {Table} from '../../../shared/components/table/table';
import {Column} from '../../../shared/components/table/table.type';
import {RequesterDto} from './requester.dto';
import {RequesterType} from './requester.enum';

@Component({
  selector: 'app-requesters',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()"/>
  `
})
export class Requesters implements OnInit {
  private service: RequesterService = inject(RequesterService);

  columns: Column<RequesterDto>[] = [
    {
      field: 'lastName',
      header: 'Név',
    },
    {
      field: 'firstName',
      header: 'Név',
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
      valueFn: (value: keyof typeof RequesterType) => RequesterType[value]
    }
  ]
  data: WritableSignal<RequesterDto[]> = signal([])

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: RequesterDto[]) => {
        this.data.set(data)
      },
    })
  }
}
