import {BaseResponseDto} from '../../../../core/dtos/base-response.dto';

export interface UserResponseDto extends BaseResponseDto {
  username: string;
  email_address: string;
  isAdmin: boolean;
}
