import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link,Switch, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import { selectLoggedInUser,isLoggedIn, getProfileRequest, accountSlice } from './store/accountSlice'
import { authSlice , loginRequest} from './store/authSlice'
import { Credential } from './types/Auth'


export interface IRoute{
  path: string
  exact?:boolean
  auth: boolean
  children: any 
  meta?:any 
}


const routes:IRoute[] = [
  {
    path:"/",
    exact:false,
    children: Dashboard,
    auth:true,
    meta:{
      title:"Dashboard"
    }
  }
]
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

      <Router>

        {!loggedIn && <Redirect to="/login"/>}
        <Route path="/login" component={Login} />
        <Switch >
          {  
            routes.map((r,i)=>{
               
               return loggedIn && <Route key={i} exact={r.exact} path={r.path} component={()=><r.children/>} /> 
            })
          }
         
        </Switch>
      </Router>
 
    </div>
  )
}

export default App
