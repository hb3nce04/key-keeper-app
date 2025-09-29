import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';

export interface UserResponseDto extends BaseResponseDto {
  username: string;
  emailAddress: string;
  isAdmin: boolean;
  isDisabled: boolean;
}
