import {Component, Inject, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormGroup, Validators} from '@angular/forms';
import {BorrowingService} from '../../borrowing.service';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {BorrowingStatus} from '../../enums/borrowing.enum';
import {RequesterService} from '../../../requesters/requester.service';
import {KeyService} from '../../../keys/key.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';

@Component({
  selector: 'app-edit-borrowing',
  imports: [
    AsyncPipe,
    Form,
    NzButtonComponent
  ],
  template: `
    <app-form [fields]="fields" (validSubmit)="handleSubmit($event)">
      <button nz-button nzType="primary"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>
  `
})
export class EditBorrowing implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditBorrowing>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected messageService: NzMessageService = inject(NzMessageService);
  protected requesterService: RequesterService = inject(RequesterService);
  protected keyService: KeyService = inject(KeyService);
  protected borrowingService: BorrowingService = inject(BorrowingService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

  fields: FieldConfig[] = [
    {
      name: 'requesterId',
      label: 'Igénylő kiválasztása',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    },
    {
      name: 'date',
      label: 'Dátum',
      type: 'date',
      validators: [Validators.required],
    },
    {
      name: 'startTime',
      label: 'Kiadás ideje',
      type: 'time',
      validators: [Validators.required],
    },
    {
      name: 'endTime',
      label: 'Visszavétel ideje',
      type: 'time'
    },
    {
      name: 'keyId',
      label: 'Kulcs kiválasztása',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    },
    {
      name: 'status',
      label: 'Állapot',
      type: 'select',
      options: Object.keys(BorrowingStatus).map(status => ({
        value: status,
        label: BorrowingStatus[status as keyof typeof BorrowingStatus],
      }) as Option),
      validators: [Validators.required]
    }
  ]

  ngOnInit(): void {
    this.requesterService.findAll().subscribe(
      data => {
        this.fields[0].options = data.map(requester => ({
          value: requester.id,
          label: `${requester.lastName} ${requester.firstName}`,
        }) as Option)
      }
    )
    this.keyService.findAll().subscribe(
      data => {
        this.fields[4].options = data.map(key => ({
          value: key.id,
          label: `${key.code} (${key.room.name} - ${key.room.code})`,
        }) as Option)
      }
    )
    this.borrowingService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'requesterId') {
            field.value = data.requester.id;
          }
          if (field.name === 'date') {
            field.value = data.date;
          }
          if (field.name === 'startTime') {
            field.value = this.convertTimeToDate(data.startTime);
          }
          if (field.name === 'endTime') {
            if (data.endTime) {
              field.value = this.convertTimeToDate(data.endTime);
            }
          }
          if (field.name === 'keyId') {
            field.value = data.key.id;
          }
          if (field.name === 'status') {
            field.value = data.status;
          }
        })
      }
    )
  }

  convertTimeToDate(time: string): Date {
    const timeParts = time.toString().split(':');
    const date = new Date();
    date.setHours(+timeParts[0]);
    date.setMinutes(+timeParts[1]);
    return date;
  }

  convertDateToTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  handleSubmit(form: FormGroup) {
    const {requesterId, keyId, date, status} = form.value;
    const startTime = this.convertDateToTime(form.value.startTime);
    const endTime = form.value.endTime ? this.convertDateToTime(form.value.endTime) : '';

    this.borrowingService.update(this.drawerData.id, {requesterId, keyId, date, startTime, endTime, status}).subscribe({
      next: () => {
        this.messageService.success("Igénylés sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
