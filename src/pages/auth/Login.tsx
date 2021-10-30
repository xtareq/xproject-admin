import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { isLoggedIn } from "../../store/accountSlice";
import { Redirect } from 'react-router-dom'



const Login:FC = () =>{

    let loggedIn = useAppSelector(isLoggedIn)

    if(loggedIn){
        return <Redirect to="/" />
    }
    return (
        <div>Login</div>
    )
}

export default Login;