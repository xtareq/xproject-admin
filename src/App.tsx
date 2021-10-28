import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { authSlice , isLoggedIn, selectLoggedInUser } from './store/authSlice'


function App() {
  const loggedIn = useAppSelector(isLoggedIn)
  const loggedInUser = useAppSelector(selectLoggedInUser)
  const distpatch = useAppDispatch()
 
  const login = ()=>{
    let user = {
      id: 1,
      name: "Tareq Hossain",
      email: "tareq@gamil.com"
    }
    distpatch(authSlice.actions.login(user))
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
