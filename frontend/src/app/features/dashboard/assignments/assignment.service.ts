import {Injectable} from '@angular/core';
import {AssignmentResponseDto} from './dtos/assignment-response.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {AssignmentRequestDto} from './dtos/assignment-request.dto';
import {CreateAssignmentRequestDto} from './dtos/create-assignment-request.dto';
import {PatchAssignmentRequestDto} from './dtos/patch-assignment-request.dto';
import {KeyStatus} from '../keys/enums/key.enum';

@Injectable({providedIn: 'root'})
export class AssignmentService extends AbstractCrudService<AssignmentRequestDto, AssignmentResponseDto> {
  constructor() {
    super('/assignments');
  }

  returnBack(entity: PatchAssignmentRequestDto) {
    return this.httpClient.patch<KeyStatus>(environment.apiUrl + this.baseUrl + "/return", entity).pipe(
      tap({
        next: (data) => {
          if (data.toString() === 'AVAILABLE') {
            this.findAll(true);
          }
        }
      })
    );
  }

  register(entity: CreateAssignmentRequestDto) {
    return this.httpClient.post<AssignmentResponseDto>(environment.apiUrl + this.baseUrl + "/register", entity).pipe(
      tap({
        next: (data) => {
          this.data$.next([...this.data$.getValue(), data])
        }
      })
    );
  }

  override create(entity: AssignmentRequestDto): Observable<AssignmentResponseDto> {
    return this.httpClient.post<AssignmentResponseDto>(environment.apiUrl + this.baseUrl, entity).pipe(
      tap({
        next: (data) => {
          this.data$.next([...this.data$.getValue(), data])
        }
      }),
    );
  }
}
