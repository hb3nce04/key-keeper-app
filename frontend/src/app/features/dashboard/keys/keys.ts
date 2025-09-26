import {Component, inject, OnInit, Signal, signal, TemplateRef, ViewChild, WritableSignal} from '@angular/core';
import {Table} from '../../../shared/components/table/table';
import {KeyService} from './key.service';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {kjua, NgxKjuaComponent} from 'ngx-kjua';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import jspdf from 'jspdf';
import {AuthService} from '../../../core/services/auth.service';
import {CreateKey} from './components/create/create';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {toSignal} from '@angular/core/rxjs-interop';
import {KeyResponseDto} from './dtos/key-response.dto';
import {EditKey} from './components/edit/edit';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {RoleService} from '../../../core/services/role.service';
import {Button, Column} from '../../../shared/components/table/table.type';
import {TableCan} from '../../../core/types/role.type';

@Component({
  selector: 'app-keys',
  imports: [
    Table,
    NzModalModule,
    NgxKjuaComponent,
    NzButtonComponent,
    NzIconDirective,

  ],
  template: `
    <app-table [buttons]="buttons" [columns]="columns" [data]="data()" (delete)="handleDelete($event)"
               (edit)="handleEdit($event)"
               (create)="handleCreate()"
                [can]="can">
      <button nz-button (click)="handlePrint()">
        <nz-icon nzType="printer" nzTheme="outline" />
        QR-kódok nyomtatása
      </button>
    </app-table>
    <ng-template #codeTemplate>
      <div style="display: flex; justify-content: center; align-items: center; margin: 10px 0;">
        <ngx-kjua [text]="this.code()"></ngx-kjua>
      </div>
    </ng-template>
  `
})
export class Keys implements OnInit {
  private authService: AuthService = inject(AuthService);
  private keyService: KeyService = inject(KeyService);
  private roleService: RoleService = inject(RoleService);
  private modalService: NzModalService = inject(NzModalService);
  private message: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

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
      icon: "qrcode",
      click: (data: KeyResponseDto) => this.showCode(data.code)
    }
  ]
  columns: Column<KeyResponseDto>[] = [
    {
      field: 'code',
      header: 'Kód',
    },
    {
      field: 'room.code',
      header: 'Helyiség kódja',
    },
    {
      field: 'room.name',
      header: 'Helyiség neve'
    },
    {
      field: 'room.building',
      header: 'Épület'
    }
  ]
  data: Signal<KeyResponseDto[]> = toSignal(this.keyService.data$, { initialValue: [] as KeyResponseDto[] });
  can: TableCan = this.roleService.privileges().keys

  ngOnInit(): void {
    this.keyService.findAll()
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

    this.printDocument(document)
  }

  printDocument(document: jspdf) {
    const blob = document.output('blob');
    const url = URL.createObjectURL(blob);
    const pdfWindow = window.open(url, '_blank');
    if (pdfWindow) {
      pdfWindow.onload = () => {
        pdfWindow?.print();
      };
    }
  }

  static getBarcodeData(data: KeyResponseDto) {
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
    this.drawerService.create({
      nzTitle: 'Új kulcs hozzáadása',
      nzContent: CreateKey,
    })
  }

  handleDelete(id: number) {
    this.keyService.delete(id).subscribe({
      next: () => {
        this.message.success("Kulcs sikeresen törölve!")
      }
    })
  }

  handleEdit(id: number) {
    this.drawerService.create({
      nzTitle: 'Kulcs módosítása',
      nzContent: EditKey,
      nzData: {
        id
      }
    })
  }
}
