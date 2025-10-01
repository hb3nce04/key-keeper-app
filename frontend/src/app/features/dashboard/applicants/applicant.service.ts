import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {ApplicantResponseDto} from './dtos/applicant.response.dto';
import {ApplicantRequestDto} from './dtos/applicant-request.dto';

@Injectable({providedIn: 'root'})
export class ApplicantService extends AbstractCrudService<ApplicantRequestDto, ApplicantResponseDto> {
  constructor() {
    super('/applicants');
  }
}
