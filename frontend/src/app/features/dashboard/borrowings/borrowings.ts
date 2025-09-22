import {Component, inject, OnInit, Signal} from '@angular/core';
import {BorrowingService} from './borrowing.service';
import {Table} from '../../../shared/components/table/table';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {Column} from '../../../shared/components/table/table.type';
import {BorrowingStatus} from './enums/borrowing.enum';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {toSignal} from '@angular/core/rxjs-interop';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateBorrowing} from './components/create/create';
import {EditBorrowing} from './components/edit/edit';
import {Scanner} from '../../../shared/components/scanner/scanner';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-records',
  imports: [
    Table,
    NzButtonComponent,
    NzModalModule,
    NzIconDirective,
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()" (edit)="handleEdit($event)">
      <button nz-button (click)="handleRequest()">
        <nz-icon nzType="qrcode" nzTheme="outline" />
        QR-kód beolvasása
      </button>
    </app-table>
  `
})
export class Borrowings implements OnInit {
  private borrowingService: BorrowingService = inject(BorrowingService);
  private drawerService: NzDrawerService = inject(NzDrawerService);
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
  data: Signal<BorrowingResponseDto[]> = toSignal(this.borrowingService.data$, {initialValue: [] as BorrowingResponseDto[]});

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
      modalRef.getContentComponent().readValue.subscribe((value: string) => {
        this.message.success(`Sikeres beolvasás!`)
        this.borrowingService.findByKeyCode(value).subscribe({
          next: (data) => {
            this.handleEdit(data.id)
          },
          error: (error) => {
            this.message.error(error.error);
          }
        })
        modalRef.close();
      })
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: 'Új igénylés felvétele',
      nzContent: CreateBorrowing,
    })
  }

  handleDelete(id: number) {
    this.borrowingService.delete(id).subscribe({
      next: () => {
        this.message.success("Foglalás sikeresen törölve!")
      }
    })
  }

  handleEdit(id: number) {
    this.drawerService.create({
      nzTitle: 'Igénylés módosítása',
      nzContent: EditBorrowing,
      nzData: {
        id
      }
    })
  }
}
