import {Component, inject, OnInit} from '@angular/core';
import {BorrowingService} from './borrowing.service';
import {Table} from '../../../shared/components/table/table';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {Column} from '../../../shared/components/table/table.type';
import {BorrowingStatus} from './enums/borrowing.enum';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {Scanner} from '../../../shared/components/scanner/scanner';
import {NzMessageService} from 'ng-zorro-antd/message';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-records',
  imports: [
    Table,
    NzButtonComponent,
    NzModalModule,
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)">
      <button nz-button (click)="handleRequest()">
        Kulcsigénylés
      </button>
      <button nz-button (click)="handleRequest()">
        Kulcsigénylés QR-kód alapján
      </button>
    </app-table>
  `
})
export class Borrowings implements OnInit {
  private borrowingService: BorrowingService = inject(BorrowingService);
  private modalService: NzModalService = inject(NzModalService);
  private message: NzMessageService = inject(NzMessageService);

  columns: Column<BorrowingResponseDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (dto: BorrowingResponseDto) => dto.requester.firstName + ' ' + dto.requester.lastName,
    },
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
      valueFn: (dto: BorrowingResponseDto) => BorrowingStatus[dto.status as unknown as keyof typeof BorrowingStatus]
    }
  ]
  data = toSignal(this.borrowingService.data$, {initialValue: [] as BorrowingResponseDto[]});

  ngOnInit(): void {
    this.borrowingService.findAll()
  }

  handleRequest() {
    const modalRef = this.modalService.info({
      nzTitle: "QR-kód beolvasása",
      nzContent: Scanner,
      nzOkText: "Bezárás",
    });
    modalRef.afterOpen.subscribe(() => {
      modalRef.getContentComponent().readValue.subscribe(value => {
        this.message.success(`Sikeres beolvasás! Érték: ${value}`)
        modalRef.close();
      })
    })
  }

  handleDelete(id: number) {
    this.borrowingService.delete(id).subscribe({
      next: () => {
        this.message.success("Foglalás sikeresen törölve!")
      }
    })
  }
}
