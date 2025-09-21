import {Component, inject, OnInit} from '@angular/core';
import {Form} from '../../../../../shared/components/form/form';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../rooms/room.service';
import {AsyncPipe} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {KeyService} from '../../key.service';

@Component({
  selector: 'app-create-key',
  imports: [
    Form,
    AsyncPipe,
    NzButtonComponent,
  ],
  template: `
    <app-form [fields]="fields" (validSubmit)="handleSubmit($event)">
      <button nz-button [nzType]="'primary'"
              [disabled]="this.loadingService.$loading | async">
        Mentés
      </button>
    </app-form>
  `
})
export class CreateKey implements OnInit {
  private keyService: KeyService = inject(KeyService);
  private roomService: RoomService = inject(RoomService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected messageService: NzMessageService = inject(NzMessageService);

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
      showSearch: true
      //validators: [Validators.required],
    }
  ]

  ngOnInit(): void {
    this.roomService.findAll().subscribe(
      data => {
        this.fields[1].options = data.map(room => ({
          value: room.id,
          label: room.name
        }) as Option)
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {code, roomId} = form.value;
    this.keyService.create({code, roomId}).subscribe({
      next: () => {
        this.messageService.success("Kulcs sikeresen létrehozva!")
      },
      error: () => {
        this.messageService.error("Hiba történt a kulcs létrehozása során!");
      }
    })
  }
}
