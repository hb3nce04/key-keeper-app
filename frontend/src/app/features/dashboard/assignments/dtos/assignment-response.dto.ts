import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';
import {KeyResponseDto} from '../../keys/dtos/key-response.dto';
import {ApplicantResponseDto} from '../../applicants/dtos/applicant.response.dto';

export interface AssignmentResponseDto extends BaseResponseDto {
  startTime: string;
  endTime: string;
  date: Date;
  key: KeyResponseDto
  applicant: ApplicantResponseDto;
}
