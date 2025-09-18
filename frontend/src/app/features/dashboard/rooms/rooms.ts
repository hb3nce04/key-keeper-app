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
      valueFn: (dto: RoomDto) => {
        if (dto.floor == 0) {
          return 'Földszint'
        }
        return `${dto.floor}. emelet`
      }
    },
    {
      field: 'building',
      header: 'Épület'
    },
    {
      field: 'capacity',
      header: 'Kapacitás',
      valueFn: (dto: RoomDto) => `${dto.capacity} fő`
    },
    {
      field: 'area',
      header: 'Terület',
      valueFn: (dto: RoomDto) => `${dto.area} nm`
    },
    {
      field: 'type',
      header: 'Típus',
      valueFn: (dto: RoomDto) => RoomType[dto.type as unknown as keyof typeof RoomType]
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
