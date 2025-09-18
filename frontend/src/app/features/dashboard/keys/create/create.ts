import {Component, inject, OnInit} from '@angular/core';
import {Form} from '../../../../shared/components/form/form';
import {FieldConfig, Option} from '../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../rooms/room.service';

@Component({
  selector: 'app-create-key',
  imports: [
    Form
  ],
  template: `
    <app-form [fields]="fields" (validSubmit)="handleSubmit($event)"/>
  `
})
export class CreateKey implements OnInit {
  private roomService: RoomService = inject(RoomService);

  fields: FieldConfig[] = [
    {
      name: 'code',
      label: 'Kód',
      type: 'text',
      validators: [Validators.required],
      extra: 'A kulcs gyári sorszáma, amit a kulcsba véstek'
    },
    {
      name: 'room',
      label: 'Helyiség kiválasztása',
      type: 'select',
      validators: [Validators.required],
    }
  ]

  ngOnInit(): void {
    this.roomService.getAll().subscribe(
      data => {
        this.fields[1].options = data.map(room => ({
          value: room.id,
          label: room.name
        }) as Option)
      }
    )
  }

  handleSubmit(form: FormGroup) {
    console.log(form)
  }
}
