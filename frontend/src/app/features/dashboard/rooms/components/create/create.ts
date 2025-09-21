import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {RoomType} from '../../enums/room.enum';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {RoomService} from '../../room.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-room',
  imports: [
    AsyncPipe,
    Form,
    NzButtonComponent
  ],
  template: `
    <app-form (validSubmit)="handleSubmit($event)" [fields]="fields">
      <button nz-button [nzType]="'primary'"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>
  `
})
export class CreateRoom {
  private drawerRef = inject(NzDrawerRef<CreateRoom>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected roomService: RoomService = inject(RoomService);
  protected messageService: NzMessageService = inject(NzMessageService);

  fields: FieldConfig[] = [
    {
      name: 'code',
      label: 'Kód',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'name',
      label: 'Név',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'floor',
      label: 'Emelet',
      type: 'number'
    },
    {
      name: 'building',
      label: 'Épület',
      type: 'number'
    },
    {
      name: 'capacity',
      label: 'Kapacitás (fő)',
      type: 'number'
    },
    {
      name: 'area',
      label: 'Terület (nm)',
      type: 'number'
    },
    {
      name: 'type',
      label: 'Típus',
      type: 'select',
      options: Object.keys(RoomType).map(type => ({
        value: type,
        label: RoomType[type as keyof typeof RoomType],
      }) as Option),
      validators: [Validators.required]
    }
  ]

  handleSubmit(form: FormGroup) {
    const {code, name, floor, building, capacity, area, type} = form.value;
    this.roomService.create({code, name, floor, building, capacity, area, type}).subscribe({
      next: () => {
        this.messageService.success("Helyiség sikeresen létrehozva!")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt a helyiség létrehozása során!");
      }
    })
  }
}
