import { FC } from "react";
import { useAppSelector, useQuery } from "../../hooks";
import { isLoggedIn } from "../../store/accountSlice";
import { Link, Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import './Login.css';
import AuthLayout from "../../layouts/AuthLayout";

const ResetPassword: FC = () => {
  let loggedIn = useAppSelector(isLoggedIn);
  let query = useQuery();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  if (loggedIn || !query.get('t')) {
    return <Redirect to="/login" />;
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
            Reset Password
          </h3>
          <Divider />
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item

            name="new_password"
            rules={[{ required: true, message: "Please input your new Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item

            name="confirm_password"
            rules={[{ required: true, message: "Please input your Confirm Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
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
      </div>
      </AuthLayout>

  );
};

export default ResetPassword;
