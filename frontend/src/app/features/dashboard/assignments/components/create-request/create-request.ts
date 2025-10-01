import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Form} from '../../../../../shared/components/form/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {LoadingService} from '../../../../../core/services/loading.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApplicantService} from '../../../applicants/applicant.service';
import {KeyService} from '../../../keys/key.service';
import {AssignmentService} from '../../assignment.service';
import {FieldConfig, Option} from '../../../../../shared/components/form/form.type';
import {FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponseDto} from '../../../../../core/dtos/api-error-response.dto';

@Component({
  selector: 'app-create-assignment-request',
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
export class CreateAssignmentRequest implements OnInit {
private drawerRef = inject(NzDrawerRef<CreateAssignmentRequest>);
protected loadingService: LoadingService = inject(LoadingService);
protected messageService: NzMessageService = inject(NzMessageService);
protected applicantService: ApplicantService = inject(ApplicantService);
protected keyService: KeyService = inject(KeyService);
protected assignmentService: AssignmentService = inject(AssignmentService);

  fields: FieldConfig[] = [
    {
      name: 'applicantId',
      label: 'Igénylő kiválasztása',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    },
    {
      name: 'keyId',
      label: 'Elérhető kulcsok',
      type: 'select',
      showSearch: true,
      validators: [Validators.required],
    }
  ]

  ngOnInit(): void {
    this.applicantService.findAll().subscribe(
      data => {
        this.fields[0].options = data.map(applicant => ({
          value: applicant.id,
          label: `${applicant.lastName} ${applicant.firstName}`,
        }) as Option)
      }
    )
    this.keyService.findReturned().subscribe(
      data => {
        this.fields[1].options = data.map(key => ({
          value: key.id,
          label: `${key.code} (${key.room.name} - ${key.room.code})`,
        }) as Option)
      }
    )
  }

  handleSubmit(form: FormGroup) {
    const {applicantId, keyId} = form.value;

    this.assignmentService.register({applicantId, keyId}).subscribe({
      next: () => {
        this.messageService.success("Igénylés sikeresen rögzítve!")
        this.drawerRef.close();
      },
      error: (err: HttpErrorResponse) => {
        const responseDto: ApiErrorResponseDto = err.error;
        this.messageService.error(responseDto.message);
      }
    })
  }
}
