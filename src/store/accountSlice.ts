import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthService } from '../api/AuthService'
import type { RootState } from './index'
import { Credential } from "../types/Auth";
import { ls } from '../utils/Ls';
import { AccountService } from '../api/AccountService';


export const getProfileRequest = createAsyncThunk('account/profile', async ()=>{
    try {
      const response = await AccountService.getProfile()
      return response.data
    } catch (error:any) {
      return Promise.reject(error&&error.response&&error.response.data)
    }
})

// Define a type for the slice state
interface AccountState {
  loading: boolean,
  isLoggedIn: boolean,
  user: any,
  accessToken:string
}

// Define the initial state using that type
const initialState: AccountState = {
  loading:false,
  isLoggedIn: false,
  user:{},
  accessToken:ls.$get("accessToken")||""
}

export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      ls.$remove("accessToken")
      state.accessToken = "",
      state.isLoggedIn = false 
      state.user = {}
    },
  },
  extraReducers(builder){
    builder.addCase(getProfileRequest.fulfilled,(state,action)=>{
      state.isLoggedIn = true 
      state.user = action.payload
      console.log(action);
      
    }),
    builder.addCase(getProfileRequest.rejected,(state,action)=>{
      state.isLoggedIn = false 
      state.user = {}
      console.log(action)
    })
  }
})

export const { logout } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedInUser= (state: RootState) => state.account.user
export const isLoggedIn = (state: RootState)=> state.account.isLoggedIn

export default accountSlice.reducer