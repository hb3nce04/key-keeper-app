import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {BorrowingService} from './borrowing.service';
import {Table} from '../../../shared/components/table/table';
import {BorrowingDto} from './borrowing.dto';
import {Column} from '../../../shared/components/table/table.type';
import {BorrowingStatus} from './borrowing.enum';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {Scanner} from '../../../shared/components/scanner/scanner';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-records',
  imports: [
    Table,
    NzButtonComponent,
    NzModalModule,
    AsyncPipe,
  ],
  template: `
    <div class="buttons">
      <button nz-button nzType="primary" (click)="handleRequest()" [disabled]="this.loadingService.$loading | async">
        Kulcsigénylés
      </button>
      <button nz-button nzType="primary" (click)="handleRequest()" [disabled]="this.loadingService.$loading | async">
        Kulcsigénylés QR-kód alapján
      </button>
    </div>
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)"/>
  `,
  styles: `
    .buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
  `
})
export class Borrowings implements OnInit {
  protected loadingService: LoadingService = inject(LoadingService);
  private service: BorrowingService = inject(BorrowingService);
  private modalService: NzModalService = inject(NzModalService);
  private message: NzMessageService = inject(NzMessageService);

  columns: Column<BorrowingDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (dto: BorrowingDto) => dto.requester.firstName + ' ' + dto.requester.lastName,
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
      valueFn: (dto: BorrowingDto) => BorrowingStatus[dto.status as unknown as keyof typeof BorrowingStatus]
    }
  ]
  data: WritableSignal<BorrowingDto[]> = signal([])

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (data: BorrowingDto[]) => {
        this.data.set(data);
      }
    })
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
    console.log(id)
  }
}
