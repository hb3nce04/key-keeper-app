import {AfterViewInit, Component, Inject, inject, ViewChild} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NZ_DRAWER_DATA, NzDrawerRef} from 'ng-zorro-antd/drawer';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormGroup, Validators} from '@angular/forms';
import {AssignmentService} from '../../assignment.service';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {ApplicantService} from '../../../applicants/applicant.service';
import {KeyService} from '../../../keys/key.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';

@Component({
  selector: 'app-edit-assignment',
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
export class EditAssignment implements AfterViewInit {
  private drawerRef = inject(NzDrawerRef<EditAssignment>);
  protected loadingService: LoadingService = inject(LoadingService);
  protected messageService: NzMessageService = inject(NzMessageService);
  protected applicantService: ApplicantService = inject(ApplicantService);
  protected keyService: KeyService = inject(KeyService);
  protected assignmentService: AssignmentService = inject(AssignmentService);

  @ViewChild(Form) form!: Form;

  constructor(@Inject(NZ_DRAWER_DATA) public readonly drawerData: { id: number }) {}

  fields: FieldConfig[] = [
    {
      name: 'applicantId',
      label: 'Igénylő kiválasztása',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    },
    {
      name: 'date',
      label: 'Dátum',
      type: 'date',
      validators: [Validators.required],
    },
    {
      name: 'startTime',
      label: 'Kiadás ideje',
      type: 'time',
      validators: [Validators.required],
    },
    {
      name: 'endTime',
      label: 'Visszavétel ideje',
      type: 'time'
    },
    {
      name: 'keyId',
      label: 'Elérhető kulcsok',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    }
  ]

  ngAfterViewInit(): void {
    this.applicantService.findAll().subscribe(
      data => {
        this.fields[0].options = data.map(applicant => ({
          value: applicant.id,
          label: `${applicant.lastName} ${applicant.firstName}`,
        }) as Option)
      }
    )
    this.keyService.findAll().subscribe(
      data => {
        this.fields[4].options = data.map(key => ({
          value: key.id,
          label: `${key.code} (${key.room.name} - ${key.room.code})`,
        }) as Option)
      }
    )
    this.assignmentService.findById(this.drawerData.id).subscribe(
      data => {
        this.form.setValue(this.fields[0], data.applicant.id)
        this.form.setValue(this.fields[1], data.date)
        this.form.setValue(this.fields[2], this.convertTimeToDate(data.startTime))
        this.form.setValue(this.fields[3], this.convertTimeToDate(data.endTime))
        this.form.setValue(this.fields[4], data.key.id)
      }
    )
  }

  convertTimeToDate(time: string): Date {
    const timeParts = time.toString().split(':');
    const date = new Date();
    date.setHours(+timeParts[0]);
    date.setMinutes(+timeParts[1]);
    return date;
  }

  convertDateToTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  handleSubmit(form: FormGroup) {
    const {applicantId, keyId, date} = form.value;
    const startTime = this.convertDateToTime(form.value.startTime);
    const endTime = form.value.endTime ? this.convertDateToTime(form.value.endTime) : '';

    this.assignmentService.put(this.drawerData.id, {applicantId, keyId, date, startTime, endTime}).subscribe({
      next: () => {
        this.messageService.success("Igénylés sikeresen módosítva!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
