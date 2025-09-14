import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {RoomDto, RoomType} from './room.dto';
import {Column} from '../../../shared/components/table/table.type';
import {HttpClient} from '@angular/common/http';
import {ENVIRONMENT} from '../../../../environments/environment';

@Component({
  selector: 'app-rooms',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()"/>
  `
})
export class Rooms implements OnInit {
  private httpClient: HttpClient = inject(HttpClient);

  columns: Column<RoomDto>[] = [
    {
      field: 'code',
      header: 'Terem',
    },
    {
      field: 'name',
      header: 'Név'
    },
    {
      field: 'floor',
      header: 'Szint',
    },
    {
      field: 'building',
      header: 'Épület'
    },
    {
      field: 'capacity',
      header: 'Kapacitás',
      valueFn: (value) => `${value} fő`
    },
    {
      field: 'area',
      header: 'Terület',
      valueFn: (value) => `${value} nm`
    },
    {
      field: 'type',
      header: 'Típus',
      valueFn: (value: keyof typeof RoomType) => RoomType[value]
    }
  ]
  data: WritableSignal<RoomDto[]> = signal([])

  ngOnInit(): void {
    this.httpClient.get<RoomDto[]>(`${ENVIRONMENT.apiUrl}/rooms`).subscribe({
      next: (data: RoomDto[]) => {
        this.data.set(data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
