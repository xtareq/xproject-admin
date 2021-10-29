import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { selectLoggedInUser,isLoggedIn, getProfileRequest } from './store/accountSlice'
import { authSlice , loginRequest} from './store/authSlice'
import { Credential } from './types/Auth'


function App() {
  const loggedIn = useAppSelector(isLoggedIn)
  const [user,setUser] = useState({})
  const loggedInUser = useAppSelector(selectLoggedInUser)
  const distpatch = useAppDispatch()

  useEffect(()=>{
    
    distpatch(getProfileRequest()).then((r)=>{
      setUser(loggedInUser)
    })
    console.log(loggedIn)
  },[distpatch])
 
  const login = ()=>{
    let cred:Credential={
      email:"tareq@gmail.com",
      password:"123456"
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
