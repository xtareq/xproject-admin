import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { authSlice , isLoggedIn, loginRequest, selectLoggedInUser } from './store/authSlice'
import { Credential } from './types/Auth'


function App() {
  const loggedIn = useAppSelector(isLoggedIn)
  const loggedInUser = useAppSelector(selectLoggedInUser)
  const distpatch = useAppDispatch()
 
  const login = ()=>{
    let cred:Credential={
      email:"tareq@gmail.com",
      password:"123465"
    }

    distpatch(loginRequest(cred))
  }

  const logout = ()=>{
    distpatch(authSlice.actions.logout())
  }

  return (
    <div className="App">
      <h3>{loggedInUser.name}</h3>
      {!loggedIn? <button onClick={login}>Login</button>:<button onClick={logout}>Logout</button>}
 
    </div>
  )
}

export default App
