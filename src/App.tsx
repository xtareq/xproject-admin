import { FC, useEffect } from 'react'
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks'
import AppLayout from './layouts/AppLayout'
import ForgetPassword from './pages/auth/ForgetPassword'
import Login from './pages/auth/Login'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/Dashboard'
import { isLoggedIn, getProfileRequest, accountSlice } from './store/accountSlice'
import { loginRequest} from './store/authSlice'
import { Credential } from './types/Auth'



export interface IRoute{
  path: string
  exact?:boolean
  auth: boolean
  children: any 
  meta?:any 
}

const publicRoutes:string[]=["/login","/forget-password","/reset-password"];
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
      <Router>
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
