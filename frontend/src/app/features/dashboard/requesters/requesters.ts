import {Component, inject, OnInit, Signal} from '@angular/core';
import {RequesterService} from './requester.service';
import {Table} from '../../../shared/components/table/table';
import {Column} from '../../../shared/components/table/table.type';
import {RequesterRequestDto} from './dtos/requester-request.dto';
import {RequesterType} from './enums/requester.enum';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateRequester} from './components/create/create';
import {toSignal} from '@angular/core/rxjs-interop';
import {RequesterResponseDto} from './dtos/requester.response.dto';
import {EditRequester} from './components/edit/edit';

@Component({
  selector: 'app-requesters',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()" (edit)="handleEdit($event)"/>
  `
})
export class Requesters implements OnInit {
  private requesterService: RequesterService = inject(RequesterService);
  private message: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

  columns: Column<RequesterResponseDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (value: RequesterRequestDto) => `${value.firstName} ${value.lastName}`
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
      valueFn: (dto: RequesterRequestDto) => RequesterType[dto.type as unknown as keyof typeof RequesterType]
    }
  ]
  data: Signal<RequesterResponseDto[]> = toSignal(this.requesterService.data$, {initialValue: [] as RequesterResponseDto[]});

  ngOnInit(): void {
    this.requesterService.findAll()
  }

  handleDelete(id: number) {
    this.requesterService.delete(id).subscribe({
      next: () => {
        this.message.success("Igénylő sikeresen törölve!")
      }
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: 'Új igénylő hozzáadása',
      nzContent: CreateRequester
    })
  }

  handleEdit(id: number) {
    this.drawerService.create({
      nzTitle: 'Igénylő módosítása',
      nzContent: EditRequester,
      nzData: {
        id
      }
    })
  }
}
