import {Role} from '../../../core/enums/role.enum';

export interface UserDto {
  username: string;
  email_address: string;
  role: Role;
}
