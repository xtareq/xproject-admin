import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { isLoggedIn } from "../../store/accountSlice";
import { Redirect } from 'react-router-dom'
import FormItem from "antd/lib/form/FormItem";
import FormItemInput from "antd/lib/form/FormItemInput";
import { Button, Divider, Input } from "antd";
import Title from "antd/lib/skeleton/Title";



const Login:FC = () =>{

    let loggedIn = useAppSelector(isLoggedIn)

    if(loggedIn){
        return <Redirect to="/" />
    }
    return (
        <div style={{position:'absolute', left:0, top:0, bottom:0, right:0, backgroundColor:'#1890ff',height:'100vh',
        display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{height:'auto', backgroundColor:'white',width:'400px', boxShadow:'0px 0px 4px grey', borderRadius:"12px", padding:"16px"}}>
                <h3 style={{textAlign:"center",fontSize:"22px",color:"indigo"}}>Login Area</h3>
                <Divider/>
                <form>
                    <FormItem>
                       <Input  size="large" type="email" placeholder="Email"   />
                    </FormItem>
                    <FormItem>
                       <Input  size="large" type="password" placeholder="**********"   />
                    </FormItem>
                    <FormItem>
                       <Button block type="primary" size="large" shape="round" htmlType="submit">Login</Button>
                    </FormItem>
                </form>
            </div>
        </div>
    )
}

export default Login;