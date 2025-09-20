import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KeyDto} from './key.dto';
import {AbstractCrudService} from '../../../core/services/abstract-crud.service';

@Injectable({providedIn: 'root'})
export class KeyService extends AbstractCrudService<KeyDto>{
  constructor(http: HttpClient) {
    super(http, '/keys');
  }
}
