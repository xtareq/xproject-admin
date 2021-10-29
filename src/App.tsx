import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { selectLoggedInUser,isLoggedIn, getProfileRequest, accountSlice } from './store/accountSlice'
import { authSlice , loginRequest} from './store/authSlice'
import { Credential } from './types/Auth'


function App() {
  let loggedIn = useAppSelector(isLoggedIn)
  const [user,setUser] = useState({})
  const loggedInUser = useAppSelector(selectLoggedInUser)
  const distpatch = useAppDispatch()

  useEffect(()=>{
   
    distpatch(getProfileRequest())
    console.log(loggedIn)

  },[distpatch,loggedIn])
 
  const login = async()=>{
    let cred:Credential={
      email:"tareq@gmail.com",
      password:"123456"
    }
    try {
     await distpatch(loginRequest(cred))
      await distpatch(getProfileRequest())
    } catch (error) {
      console.log(error);
      
    }

  }

  const logout = ()=>{
    distpatch(accountSlice.actions.logout())
  }

  return (
    <div className="App">
      <h3>{loggedInUser.name}</h3>
      {!loggedIn? <button onClick={login}>Login</button>:<button onClick={logout}>Logout</button>}
 
    </div>
  )
}

export default App
