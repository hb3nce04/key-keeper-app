import {Component, Inject, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {FormGroup, Validators} from '@angular/forms';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {RoomType} from '../../enums/room.enum';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {RoomService} from '../../room.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-edit-room',
  imports: [
    AsyncPipe,
    Form,
    NzButtonComponent
  ],
  template: `
    <app-form (validSubmit)="handleSubmit($event)" [fields]="fields">
      <button nz-button nzType="primary"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>
  `
})
export class EditRoom implements OnInit {
  private drawerRef = inject(NzDrawerRef<EditRoom>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected roomService: RoomService = inject(RoomService);
  protected messageService: NzMessageService = inject(NzMessageService);

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

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
      type: 'text'
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

  ngOnInit(): void {
    this.roomService.findById(this.drawerData.id).subscribe(
      data => {
        this.fields.map((field: FieldConfig) => {
          if (field.name === 'code') {
            field.value = data.code
          }
          if (field.name === 'name') {
            field.value = data.name
          }
          if (field.name === 'floor') {
            field.value = data.floor
          }
          if (field.name === 'building') {
            field.value = data.building
          }
          if (field.name === 'capacity') {
            field.value = data.capacity
          }
          if (field.name === 'area') {
            field.value = data.area
          }
          if (field.name === 'type') {
            field.value = data.type
          }
        })
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {code, name, floor, building, capacity, area, type} = form.value;
    this.roomService.update(this.drawerData.id, {code, name, floor, building, capacity, area, type}).subscribe({
      next: () => {
        this.messageService.success("Helyiség sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: () => {
        this.messageService.error("Hiba történt a helyiség módosítása során!");
      }
    })
  }
}
