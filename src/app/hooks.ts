import { fetchUsersAsync, addUsersAsync, registerUserAsync } from './../features/users/usersSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAction = () => {
   const dispatch = useDispatch();
   return bindActionCreators({ fetchUsersAsync, addUsersAsync, registerUserAsync }, dispatch);
}