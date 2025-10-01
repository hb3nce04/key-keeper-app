import {Component, inject, OnInit, Signal} from '@angular/core';
import {ApplicantService} from './applicant.service';
import {Table} from '../../../shared/components/table/table';
import {Column} from '../../../shared/components/table/table.type';
import {ApplicantRequestDto} from './dtos/applicant-request.dto';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzDrawerService} from 'ng-zorro-antd/drawer';
import {CreateApplicant} from './components/create/create';
import {toSignal} from '@angular/core/rxjs-interop';
import {ApplicantResponseDto} from './dtos/applicant.response.dto';
import {EditApplicant} from './components/edit/edit';
import {RoleService} from '../../../core/services/role.service';
import {TableCan} from '../../../core/types/role.type';
import {ApplicantType} from './enums/applicant.enum';

@Component({
  selector: 'app-applicants',
  imports: [
    Table
  ],
  template: `
    <app-table [columns]="columns" [data]="data()" (delete)="handleDelete($event)" (create)="handleCreate()" (edit)="handleEdit($event)" [can]="can"/>
  `
})
export class Applicants implements OnInit {
  private applicantService: ApplicantService = inject(ApplicantService);
  private roleService: RoleService = inject(RoleService);
  private message: NzMessageService = inject(NzMessageService);
  private drawerService: NzDrawerService = inject(NzDrawerService);

  columns: Column<ApplicantResponseDto>[] = [
    {
      field: 'name',
      header: 'Név',
      valueFn: (value: ApplicantRequestDto) => `${value.lastName} ${value.firstName}`
    },
    {
      field: 'personalIdNumber',
      header: 'Személy igazolvány szám'
    },
    {
      field: 'emailAddress',
      header: 'E-mail cím'
    },
    {
      field: 'phoneNumber',
      header: 'Telefonszám'
    },
    {
      field: 'type',
      header: 'Típus',
      valueFn: (dto: ApplicantRequestDto) => ApplicantType[dto.type as unknown as keyof typeof ApplicantType]
    }
  ]
  data: Signal<ApplicantResponseDto[]> = toSignal(this.applicantService.data$, {initialValue: [] as ApplicantResponseDto[]});
  can: TableCan = this.roleService.privileges().applicants

  ngOnInit(): void {
    this.applicantService.findAll()
  }

  handleDelete(id: number) {
    this.applicantService.delete(id).subscribe({
      next: () => {
        this.message.success("Igénylő sikeresen törölve!")
      }
    })
  }

  handleCreate() {
    this.drawerService.create({
      nzTitle: 'Új igénylő hozzáadása',
      nzContent: CreateApplicant
    })
  }

  handleEdit(id: number) {
    this.drawerService.create({
      nzTitle: 'Igénylő módosítása',
      nzContent: EditApplicant,
      nzData: {
        id
      }
    })
  }
}
