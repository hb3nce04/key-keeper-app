import {RequesterType} from './requester.enum';
import {BaseDto} from '../../../core/dtos/base.dto';

export interface RequesterDto extends BaseDto {
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: RequesterType
}
