import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './index'

// Define a type for the slice state
interface AppState {
  appName: string
}

// Define the initial state using that type
const initialState: AppState = {
  appName: "Xproject",
}

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeAppName: (state, action: PayloadAction<string>) => {
      state.appName = action.payload
    },
    resetAppName: (state) => {
      state.appName = "Xproject"
    },
  },
})

export const { changeAppName, resetAppName } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAppName = (state: RootState) => state.app.appName

export default appSlice.reducer