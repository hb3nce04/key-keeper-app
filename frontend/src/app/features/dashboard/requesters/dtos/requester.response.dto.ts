import {RequesterType} from '../enums/requester.enum';
import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';

export interface RequesterResponseDto extends BaseResponseDto{
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: RequesterType
}
