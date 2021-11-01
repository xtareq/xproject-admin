import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthService } from '../api/AuthService'
import type { RootState } from './index'
import { Credential } from "../types/Auth";
import { ls } from '../utils/Ls';


export const loginRequest = createAsyncThunk('auth/login', async (credential:Credential)=>{
      try {
        const {data:result} = await AuthService.doLogin(credential)
        ls.$set("accessToken",result.token)
        return {result}
      } catch (error: any) {
        if(error&&error.response&&error.response.data){
          return {errors:error&&error.response&&error.response.data}
        } 

        return error;
      }
})

// Define a type for the slice state
interface AuthState {
  loading: boolean,
  isLoggedIn: boolean,
  accessToken:string,
  error: string | Array<string> | undefined
  
}

// Define the initial state using that type
const initialState: AuthState = {
  loading:false,
  isLoggedIn: false,
  accessToken:"",
  error:''
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: (state) => {
      ls.$remove("accessToken")
      state.accessToken = "",
      state.isLoggedIn = false 
    },
  },
  extraReducers(builder){
    builder.addCase(loginRequest.fulfilled,(state,action)=>{
      state.isLoggedIn = true 
    })
  }
})

export const { logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isLoggedIn = (state: RootState)=> state.auth.isLoggedIn

export default authSlice.reducer