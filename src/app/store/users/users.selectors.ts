// src/app/store/users/users.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);