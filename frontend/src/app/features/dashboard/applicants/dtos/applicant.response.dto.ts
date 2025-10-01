import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {ApplicantType} from '../enums/applicant.enum';

export interface ApplicantResponseDto extends BaseResponseDto{
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: ApplicantType
}
