import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {KeyService} from './key.service';
import {KeyDto} from './key.dto';
import {Column} from '../../../shared/components/table/table.type';

@Component({
  selector: 'app-keys',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()"/>
  `
})
export class Keys implements OnInit {
  private service: KeyService = inject(KeyService);

  columns: Column<KeyDto>[] = [
    {
      field: 'code',
      header: 'Kód',
    },
    {
      field: 'room.code',
      header: 'Terem',
    },
  ]
  data: WritableSignal<KeyDto[]> = signal([])

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: KeyDto[]) => {
        this.data.set(data);
      }
    })
  }

}
