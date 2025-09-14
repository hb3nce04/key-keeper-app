import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {BorrowingService} from './borrowing.service';
import {Table} from '../../../shared/components/table/table';
import {BorrowingDto} from './borrowing.dto';
import {Column} from '../../../shared/components/table/table.type';
import {BorrowingStatus} from './borrowing.enum';

@Component({
  selector: 'app-records',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()"/>
  `
})
export class Borrowings implements OnInit {
  private service: BorrowingService = inject(BorrowingService);

  columns: Column<BorrowingDto>[] = [
    {
      field: 'date',
      header: 'Dátum',
    },
    {
      field: 'startTime',
      header: 'Kiadás ideje',
    },
    {
      field: 'endTime',
      header: 'Visszavétel ideje'
    },
    {
      field: 'key.room.code',
      header: 'Terem',
    },
    {
      field: 'status',
      header: 'Állapot',
      valueFn: (value: keyof typeof BorrowingStatus) => BorrowingStatus[value]
    }
  ]
  data: WritableSignal<BorrowingDto[]> = signal([])

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: BorrowingDto[]) => {
        this.data.set(data);
      }
    })
  }

}
