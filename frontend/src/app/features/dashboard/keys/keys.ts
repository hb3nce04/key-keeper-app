import {Component, inject, OnInit, signal, TemplateRef, ViewChild, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {KeyService} from './key.service';
import {KeyDto} from './key.dto';
import {Button, Column} from '../../../shared/components/table/table.type';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {kjua, NgxKjuaComponent} from 'ngx-kjua';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import jspdf from 'jspdf';
import {AuthService} from '../../../core/services/auth.service';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';
import {CreateKey} from './create/create';

@Component({
  selector: 'app-keys',
  imports: [
    Table,
    NzModalModule,
    NgxKjuaComponent,
    NzButtonComponent,
    AsyncPipe,
  ],
  template: `
    <div class="buttons">
      <button nz-button nzType="primary" (click)="handleCreate()" [disabled]="this.loadingService.$loading | async">
        Új kulcs rögzítése
      </button>
      <button nz-button nzType="primary" (click)="handlePrint()" [disabled]="this.loadingService.$loading | async">
        QR-kódok nyomtatása
      </button>
    </div>
    <ng-template #codeTemplate>
      <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
        <ngx-kjua [text]="this.code()"></ngx-kjua>
      </div>
    </ng-template>
    <app-table [buttons]="buttons" [columns]="columns" [data]="data()"/>
  `,
  styles: `
    .buttons {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }
  `
})
export class Keys implements OnInit {
  protected loadingService: LoadingService = inject(LoadingService);
  private authService: AuthService = inject(AuthService);
  private service: KeyService = inject(KeyService);
  private modalService: NzModalService = inject(NzModalService);

  @ViewChild('codeTemplate') codeTemplate!: TemplateRef<any>;

  code: WritableSignal<string> = signal('');

  marginX = 2;
  marginY = 2;
  cellWidth = 16;
  cellHeight = 16;
  rowsPerPage = 18;
  columnsPerPage = 13;

  buttons: Button[] = [
    {
      label: "QR-kód",
      type: "dashed",
      click: (data: KeyDto) => this.showCode(data.code)
    }
  ]
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

  private showCode(code: string) {
    this.code.set(code)
    this.modalService.info({
      nzTitle: "QR-kód",
      nzContent: this.codeTemplate,
      nzOkText: "Bezárás"
    });
  }

  handlePrint() {
    const document = new jspdf();

    let columnIndex = 0;
    let rowIndex = 0;

    for (const data of this.data()) {
      const barcodeData = Keys.getBarcodeData(data);
      const x = this.marginX + columnIndex * this.cellWidth;
      const y = this.marginY + rowIndex * this.cellHeight;
      document.addImage(barcodeData, "PNG", x, y, this.cellWidth - 2, this.cellHeight - 2);

      rowIndex++;

      if (rowIndex >= this.rowsPerPage) {
        rowIndex = 0;
        columnIndex++;
      }

      if (columnIndex >= this.columnsPerPage) {
        columnIndex = 0;
        rowIndex = 0;
        document.addPage();
      }
    }

    const totalPages = document.getNumberOfPages();
    const timestamp = new Date().toLocaleString();
    for (let i = 1; i <= totalPages; i++) {
      document.setPage(i);
      document.setFontSize(8);
      document.text(
        `Oldal: ${i}/${totalPages}, generálva: ${timestamp}, általa: ${this.authService.getUsername()}`,
        this.marginX,
        document.internal.pageSize.getHeight() - this.marginY
      );
    }

    document.save(`qr.pdf`);
  }

  static getBarcodeData(data: KeyDto) {
    return kjua({
      render: "canvas",
      crisp: true,
      minVersion: 1,
      ecLevel: "Q",
      size: 900,
      fill: "#000",
      back: "#F0F0F0",
      text: data.code,
      rounded: 10,
      quiet: 2,
      mode: "label",
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      label: `${data.code}: ${data.room.code} - ${data.room.name} (${data.room.building})`,
      fontname: "sans-serif",
      fontcolor: "#3F51B5",
    });
  }

  handleCreate() {
    this.modalService.create({
      nzTitle: 'Új kulcs rögzítése',
      nzContent: CreateKey
    })
  }
}
