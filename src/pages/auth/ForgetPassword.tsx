import { FC } from "react";
import { useAppSelector } from "../../hooks";
import { isLoggedIn } from "../../store/accountSlice";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined,  MailOutlined } from "@ant-design/icons";
import './Login.css';
import AuthLayout from "../../layouts/AuthLayout";

const ForgetPassword: FC = () => {
  let loggedIn = useAppSelector(isLoggedIn);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <AuthLayout>
      <div
        style={{
          height: "auto",
          backgroundColor: "white",
          width: "400px",
          boxShadow: "0px 0px 4px grey",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <h3 style={{ textAlign: "center", fontSize: "22px", color: "indigo" }}>
         Forget Password
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
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              size="large"
              htmlType="submit"
              className="bg-warning login-form-button"
            >
             Send Reset Link
            </Button>
            <Divider>OR</Divider>
            <Link to="/login" >Login Now</Link>
          </Form.Item>
        </Form>
      </div>

    </AuthLayout>


  );
};

export default ForgetPassword;
