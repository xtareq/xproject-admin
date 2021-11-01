import { FC, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link,Switch, Redirect, useHistory, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks'
import AppLayout from './layouts/AppLayout'
import ForgetPassword from './pages/auth/ForgetPassword'
import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/Dashboard'
import { selectLoggedInUser,isLoggedIn, getProfileRequest, accountSlice } from './store/accountSlice'
import { authSlice , loginRequest} from './store/authSlice'
import { Credential } from './types/Auth'
import { createBrowserHistory } from "history";


export interface IRoute{
  path: string
  exact?:boolean
  auth: boolean
  children: any 
  meta?:any 
}

const publicRoutes:string[]=["/login","/forget-password","/reset-password"];
const history = createBrowserHistory();
const routes:IRoute[] = [
  {
    path:"/",
    exact:true,
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
      {/* <h3>{loggedInUser.name}</h3>
      {!loggedIn? <button onClick={login}>Login</button>:<button onClick={logout}>Logout</button>} */}

      <Router history={history}>
         <Route path="/login" component={()=><Login/>}/>
         <Route path="/forget-password" component={()=><ForgetPassword/>}/>
         <Route path="/reset-password" component={()=><ResetPassword/>}/>
         {!loggedIn ?!publicRoutes.includes(window.location.pathname)&&<Redirect to="/login"/>:
         <AppLayout>
            <Switch >
              {  
                routes.map((r,i)=>{
                  return <Route key={i} exact={r.exact} path={r.path} component={()=><r.children/>} /> 
                })
              }
            
            </Switch>
         </AppLayout>
        }

      </Router>
 
    </div>
  )
}

export default App
