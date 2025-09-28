import {inject, Injectable} from '@angular/core';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';
import {KeyResponseDto} from './dtos/key-response.dto';
import {KeyRequestDto} from './dtos/key-request.dto';
import {KeyStatus} from './enums/key.enum';
import {map, Observable, switchMap, tap} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {UpdateKeyStatusRequestDto} from './dtos/update-key-status-request.dto';
import {RoomService} from '../rooms/room.service';

@Injectable({providedIn: 'root'})
export class KeyService extends AbstractCrudService<KeyRequestDto, KeyResponseDto> {
  private roomService = inject(RoomService);

  constructor() {
    super('/keys');
  }

  override create(entity: KeyRequestDto): Observable<KeyResponseDto> {
    return this.httpClient.post<KeyResponseDto>(environment.apiUrl + this.baseUrl, entity).pipe(
      switchMap(data =>
        this.roomService.findById(data.room.id).pipe(
          map(room => ({ ...data, room }))
        )
      )
    );
  }

  findAvailable(): Observable<KeyResponseDto[]> {
    return this.httpClient.get<KeyResponseDto[]>(environment.apiUrl + this.baseUrl + '/available');
  }

  findReturned(): Observable<KeyResponseDto[]> {
    return this.httpClient.get<KeyResponseDto[]>(environment.apiUrl + this.baseUrl + '/returned');
  }

  updateStatus(dto: UpdateKeyStatusRequestDto): Observable<KeyStatus> {
    return this.httpClient.patch<KeyStatus>(`${environment.apiUrl + this.baseUrl}/status`, dto).pipe(
      tap({
        next: (updatedData) => {
          const currentData = this.data$.getValue();
          const index = currentData.findIndex(item => item.id === dto.id);
          if (index !== -1) {
            currentData[index].status = updatedData;
            this.data$.next([...currentData]);
          }
        },
      }),
    );
  }

  returnBackByCode(code: string) {
    return this.httpClient.patch<KeyStatus>(environment.apiUrl + this.baseUrl + `/${code}` + "/return", {});
  }
}
