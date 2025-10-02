import {Component, Inject, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {FormGroup, FormsModule, Validators} from '@angular/forms';
import {RoomService} from '../../../rooms/room.service';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {KeyService} from '../../key.service';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzDividerComponent} from 'ng-zorro-antd/divider';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-edit-key',
  imports: [
    Form,
    AsyncPipe,
    NzButtonComponent,
    FormsModule,
    NzModalModule,
    NzDividerComponent,
    NzIconDirective
  ],
  template: `
    <app-form [fields]="fields" (validSubmit)="handleSubmit($event)">
      <button nz-button nzType="primary"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>
    <nz-divider [nzText]="text">
      <ng-template #text>
        <nz-icon nzType="key"/>
        Állapot módosítása
      </ng-template>
    </nz-divider>
    <app-form [fields]="statusFields" (validSubmit)="handleStatusSubmit($event)">
      <button nz-button nzType="primary"
              [disabled]="this.loadingService.$loading | async">
        Frissítés
      </button>
    </app-form>
  `
})
export class EditKey implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditKey>);
  private keyService: KeyService = inject(KeyService);
  private roomService: RoomService = inject(RoomService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected messageService: NzMessageService = inject(NzMessageService);
  protected modalService: NzModalService = inject(NzModalService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {
  }

  fields: FieldConfig[] = [
    {
      name: 'code',
      label: 'Kód',
      type: 'text',
      validators: [Validators.required],
      extra: 'A kulcs gyári sorszáma, amit a kulcsba véstek.'
    },
    {
      name: 'roomId',
      label: 'Helyiség kiválasztása',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    }
  ]

  statusFields: FieldConfig[] = [
    {
      name: 'status',
      type: 'radio',
      options: [
        {
          value: "LOST",
          label: "Elveszett"
        },
        {
          value: "DAMAGED",
          label: "Sérült"
        }
      ]
    }
  ]

  ngOnInit(): void {
    this.roomService.findAll().subscribe(
      data => {
        this.fields[1].options = data.map(room => ({
          value: room.id,
          label: `${room.code} (${room.name})`,
        }) as Option)
      }
    )
    this.keyService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'code') {
            field.value = data.code
          }
          if (field.name === 'roomId') {
            field.value = data.room.id
          }
        })
        if (data.status.toString() === "LOST" || data.status.toString() === "DAMAGED") {
          this.fields[2].visible = false
        }
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {code, roomId} = form.value;
    this.keyService.put(this.drawerData.id, {code, roomId}).subscribe({
      next: () => {
        this.messageService.success("Kulcs sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }

  handleStatusSubmit(form: FormGroup) {
    const {status} = form.value;
    if (status === 'LOST' || status === 'DAMAGED') {
      this.modalService.confirm({
        nzTitle: "Kulcs-állapot módosítás",
        nzContent: "Biztosan módosítani szeretnéd a kulcs állapotát? Figyelem! A művelet később nem vonható vissza.",
        nzOkText: "Igen",
        nzCancelText: "Nem",
        nzOnOk: () => {
          this.keyService.updateStatus({id: this.drawerData.id, status}
          ).subscribe({
            next: () => {
              this.messageService.success("A kulcs állapota sikeresen módosítva!")
              this.drawerRef.close();
            },
            error: (err: HttpErrorResponse) => {
              const responseDto: ApiErrorResponseDto = err.error;
              this.messageService.error(responseDto.message);
            }
          })
        },
        nzOnCancel: () => {
          this.drawerRef.close();
        }
      })
    }
  }
}
