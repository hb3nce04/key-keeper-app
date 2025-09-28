import {Component, inject, OnInit, Signal} from '@angular/core';
import {BorrowingService} from './borrowing.service';
import {Table} from '../../../shared/components/table/table';
import {BorrowingResponseDto} from './dtos/borrowing-response.dto';
import {Button, Column} from '../../../shared/components/table/table.type';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {toSignal} from '@angular/core/rxjs-interop';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateBorrowing} from './components/create/create';
import {EditBorrowing} from './components/edit/edit';
import {Scanner} from '../../../shared/components/scanner/scanner';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {RoleService} from '../../../core/services/role.service';
import {TableCan} from '../../../core/types/role.type';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../core/dtos/api-error-response.dto';
import {CreateBorrowingRequest} from './components/create-request/create-request';
import {KeyService} from '../keys/key.service';

@Component({
  selector: 'app-records',
  imports: [
    Table,
    NzButtonComponent,
    NzModalModule,
    NzIconDirective,
  ],
  template: `
    <app-table [buttons]="buttons" [columns]="columns" [data]="data()" (delete)="handleDelete($event)"
               (create)="handleCreate()" (edit)="handleEdit($event)" [can]="can">
      <button nz-button (click)="handleRequest()">
        <nz-icon nzType="plus"/>
        Új igénylés felvétele
      </button>
      <button nz-button (click)="handleReturn()">
        <nz-icon nzType="qrcode" nzTheme="outline"/>
        Leadás QR-kód alapján
      </button>
    </app-table>
  `
})
export class Borrowings implements OnInit {
  private borrowingService: BorrowingService = inject(BorrowingService);
  private keyService: KeyService = inject(KeyService);
  private roleService: RoleService = inject(RoleService);
  private messageService: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);
  private modalService: NzModalService = inject(NzModalService);
  private message: NzMessageService = inject(NzMessageService);

  buttons: Button[] = [
    {
      label: "Leadás",
      type: "dashed",
      icon: "issues-close",
      click: (data: BorrowingResponseDto) => this.returnBackById(data.id)
    }
  ]
  columns: Column<BorrowingResponseDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (dto: BorrowingResponseDto) => dto.requester.lastName + ' ' + dto.requester.firstName,
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
    }
  ]
  data: Signal<BorrowingResponseDto[]> = toSignal(this.borrowingService.data$, {initialValue: [] as BorrowingResponseDto[]});
  can: TableCan = this.roleService.privileges().borrowings

  ngOnInit(): void {
    this.borrowingService.findAll()
  }

  handleReturn() {
    const modalRef = this.modalService.info({
      nzTitle: "QR-kód beolvasása",
      nzContent: Scanner,
      nzOkText: "Bezárás",
    });
    modalRef.afterOpen.subscribe(() => {
      modalRef.getContentComponent().readValue.subscribe((value: string) => {
        this.message.success(`Sikeres beolvasás!`)
        this.returnBackByCode(value)
        modalRef.close();
      })
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: 'Új bejegyzés létrehozása',
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

  handleRequest() {
    this.drawerService.create({
      nzTitle: 'Új igénylés felvétele',
      nzContent: CreateBorrowingRequest,
    })
  }

  returnBackByCode(code: string) {
    this.keyService.returnBackByCode(code).subscribe({
      next: (data) => {
        if (data.toString() === 'RETURNED') {
          this.messageService.success("Kulcs sikeresen átvéve!")
        }
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }

  returnBackById(id: number) {
    this.borrowingService.returnBack({borrowingId: id}).subscribe({
      next: (data) => {
        console.log(data);
        if (data.toString() === 'RETURNED') {
          this.messageService.success("Kulcs sikeresen átvéve!")
        }
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
