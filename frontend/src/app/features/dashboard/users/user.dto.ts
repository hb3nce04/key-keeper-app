import {Role} from '../../../core/enums/role.enum';
import {BaseDto} from '../../../core/dtos/base.dto';

export interface UserDto extends BaseDto {
  username: string;
  email_address: string;
  role: Role;
}
