import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { authSlice , isLoggedIn, selectLoggedInUser } from './store/authSlice'
import { Button } from 'antd'

const App:FC = ()=> {
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
      <h1>{loggedInUser.name}</h1>
      {!loggedIn? <Button shape="round" type="primary" onClick={login}>Login</Button>:<Button shape="round" type="dashed" onClick={logout}>Logout</Button>}
 
    </div>
  )
}

export default App
