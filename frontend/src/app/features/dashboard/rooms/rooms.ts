import {Component, inject, OnInit, Signal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {RoomResponseDto} from './dtos/room-response.dto';
import {Column} from '../../../shared/components/table/table.type';
import {RoomService} from './room.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CreateRoom} from './components/create/create';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {toSignal} from '@angular/core/rxjs-interop';
import {RoomType} from './enums/room.enum';

@Component({
  selector: 'app-rooms',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()"/>
  `
})
export class Rooms implements OnInit {
  private roomService: RoomService = inject(RoomService);
  private message: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

  columns: Column<RoomResponseDto>[] = [
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
      valueFn: (dto: RoomResponseDto) => {
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
      valueFn: (dto: RoomResponseDto) => `${dto.capacity} fő`
    },
    {
      field: 'area',
      header: 'Terület',
      valueFn: (dto: RoomResponseDto) => `${dto.area} nm`
    },
    {
      field: 'type',
      header: 'Típus',
      valueFn: (dto: RoomResponseDto) => RoomType[dto.type as unknown as keyof typeof RoomType]
    }
  ]
  data: Signal<RoomResponseDto[]> = toSignal(this.roomService.data$, {initialValue: [] as RoomResponseDto[]});

  ngOnInit(): void {
    this.roomService.findAll()
  }

  handleDelete(id: number) {
    this.roomService.delete(id).subscribe({
      next: () => {
        this.message.success("Helyiség sikeresen törölve!")
      }
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: "Új helyiség hozzáadása",
      nzContent: CreateRoom
    })
  }
}
