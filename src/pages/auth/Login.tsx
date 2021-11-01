import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getProfileRequest, isLoggedIn } from "../../store/accountSlice";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Divider, message as toast, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import './Login.css';
import AuthLayout from "../../layouts/AuthLayout";
import { loginRequest } from "../../store/authSlice";
import { AxiosError } from "axios";

const Login: FC = () => {
  let loggedIn = useAppSelector(isLoggedIn);
  let [loading, setLoading]  = useState(false)
  const distpatch = useAppDispatch()
  const history = useHistory()

  useEffect(()=>{
 

  },[loggedIn])
  const onFinish =async (values: any) => {
      setLoading(true)
   
     let {payload} = await distpatch(loginRequest(values))
     setLoading(false)
     if(payload.errors){
       if(payload.errors.errors){
          payload.errors.errors.forEach((e:string)=>{
            toast.error(e)
          })
       }
       if(payload.errors.message){
          toast.error(payload.errors.message)
       }
     }else{
        toast.success("Logged In Successfully!")
        window.location.href="/"
     }
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return (
      <AuthLayout>
        <div
          style={{
            height: "auto",
          
            width: "400px",
          
            borderRadius: "12px",
            padding: "10px",
            display: "flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >

     
          <Card style={{width:'inherit'}}>
           
          <h3 style={{ textAlign: "center", fontSize: "22px", color: "indigo" }}>
            Login Area
          </h3>
          <Divider />
          
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
             size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item

            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link style={{float:'right'}} to="/forget-password">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              block
              type="primary"
              size="large"
              htmlType="submit"
              className=" login-form-button"
            >
              Log in
            </Button>
{/*             <Divider>OR</Divider>
           Doesn't have any account?<a href="">Register now!</a> */}
          </Form.Item>
        </Form>
          </Card>
          
          

      </div>
      </AuthLayout>

  );
};

export default Login;
