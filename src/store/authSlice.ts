import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthService } from '../api/AuthService'
import type { RootState } from './index'
import { Credential } from "../types/Auth";

export const loginRequest = createAsyncThunk('auth/login', async (credential:Credential)=>{
  const response = await AuthService.doLogin(credential)
  return response.data
})

// Define a type for the slice state
interface AuthState {
  loading: boolean,
  isLoggedIn: boolean,
  user: any
}

// Define the initial state using that type
const initialState: AuthState = {
  loading:false,
  isLoggedIn: false,
  user:{}
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false 
      state.user = {}
    },
  },
  extraReducers(builder){
    builder.addCase(loginRequest.fulfilled,(state,action)=>{
      state.isLoggedIn = true 
      state.user = action.payload
    }),
    builder.addCase(loginRequest.rejected,(state,action)=>{
      state.isLoggedIn = false 
      state.user = {}
      console.log(action.payload)
    })
  }
})

export const { logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedInUser= (state: RootState) => state.auth.user
export const isLoggedIn = (state: RootState)=> state.auth.isLoggedIn

export default authSlice.reducer