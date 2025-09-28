import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormGroup, Validators} from '@angular/forms';
import {BorrowingService} from '../../borrowing.service';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {KeyService} from '../../../keys/key.service';
import {RequesterService} from '../../../requesters/requester.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';

@Component({
  selector: 'app-create-borrowing',
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
export class CreateBorrowing implements OnInit {
  private drawerRef = inject(NzDrawerRef<CreateBorrowing>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected messageService: NzMessageService = inject(NzMessageService);
  protected requesterService: RequesterService = inject(RequesterService);
  protected keyService: KeyService = inject(KeyService);
  protected borrowingService: BorrowingService = inject(BorrowingService);

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
    this.keyService.findReturned().subscribe(
      data => {
        this.fields[4].options = data.map(key => ({
          value: key.id,
          label: `${key.code} (${key.room.name} - ${key.room.code})`,
        }) as Option)
      }
    )
    this.fields.map((field: FieldConfig) => {
      if (field.name === 'date') {
        field.value = new Date();
      }
      if (field.name === 'startTime') {
        field.value = this.convertTimeToDate(this.convertDateToTime(new Date()));
      }
    })
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
    const {requesterId, keyId, date} = form.value;
    const startTime = this.convertDateToTime(form.value.startTime);
    const endTime = form.value.endTime ? this.convertDateToTime(form.value.endTime) : '';

    this.borrowingService.create({requesterId, keyId, date, startTime, endTime}).subscribe({
      next: () => {
        this.messageService.success("Igénylés sikeresen létrehozva!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
