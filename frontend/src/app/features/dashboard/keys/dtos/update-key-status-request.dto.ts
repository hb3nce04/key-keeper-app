import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';

export interface UpdateKeyStatusRequestDto extends BaseResponseDto {
  status: string;
}
