import {Role} from '../../../../core/enums/role.enum';

export interface UserRequestDto {
  username: string;
  email_address: string;
  role: Role;
}
