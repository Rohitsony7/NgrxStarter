// src/app/store/users/users.state.ts
import { User } from '../../core/models/user.model';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialUsersState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export interface AppState {
  users: UsersState;
}