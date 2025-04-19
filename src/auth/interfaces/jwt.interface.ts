import { UserType } from 'src/user/enums';

export interface JwtPayload {
  id: string;
  email: string;
  type: UserType;
}
