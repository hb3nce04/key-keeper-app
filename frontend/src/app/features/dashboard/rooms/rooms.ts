import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {RoomDto, RoomType} from './room.dto';
import {Column} from '../../../shared/components/table/table.type';
import {RoomService} from './room.service';

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
  private service: RoomService = inject(RoomService);

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
      valueFn: (val) => {
        if (val == 0) {
          return 'Földszint'
        }
        return `${val}. emelet`
      }
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
    this.service.getAll().subscribe({
      next: (data: RoomDto[]) => {
        this.data.set(data)
      },
    })
  }
}
