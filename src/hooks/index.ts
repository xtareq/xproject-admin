import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import {
    useLocation
  } from "react-router-dom";
import { AxiosError, AxiosResponse } from 'axios';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

interface Result {
  result?: any,
  statusCode?: number | string,
  err?: any 
}
export const useApi = async (promise:AxiosResponse<any, any>)=>{


}