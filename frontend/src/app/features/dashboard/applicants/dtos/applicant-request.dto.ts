import {ApplicantType} from '../enums/applicant.enum';

export interface ApplicantRequestDto {
  firstName: string;
  lastName: string;
  personalIdNumber: string;
  emailAddress: string;
  phoneNumber: string;
  type: ApplicantType
}
