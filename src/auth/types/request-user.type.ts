import { User } from 'src/user/entities';

export type RequestUser = Omit<User, 'pkid' | 'password'>;
