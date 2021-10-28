import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

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
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true 
      state.user = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false 
      state.user = {}
    },
  },
})

export const { login, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedInUser= (state: RootState) => state.auth.user
export const isLoggedIn = (state: RootState)=> state.auth.isLoggedIn

export default authSlice.reducer