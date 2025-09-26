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
import {RoomService} from '../../../rooms/room.service';

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
  protected roomService: RoomService = inject(RoomService);
  protected borrowingService: BorrowingService = inject(BorrowingService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

  fields: FieldConfig[] = [
    {
      name: 'lastName',
      label: 'Vezetéknév',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'firstName',
      label: 'Keresztnév',
      type: 'email',
      validators: [Validators.required],
    },
    {
      name: 'roomId',
      label: 'Helyiség kiválasztása',
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
    this.roomService.findAll().subscribe(
      data => {
        this.fields[2].options = data.map(room => ({
          value: room.id,
          label: `${room.code} (${room.name})`,
        }) as Option)
      }
    )
    this.borrowingService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'firstName') {
            field.value = data.requester.firstName;
          }
          if (field.name === 'lastName') {
            field.value = data.requester.lastName;
          }
          if (field.name === 'roomId') {
            field.value = data.key.room.id;
          }
          if (field.name === 'status') {
            field.value = data.status;
          }
        })
      }
    )
  }

  handleSubmit(form: FormGroup) {
    this.drawerRef.close();
  }
}
