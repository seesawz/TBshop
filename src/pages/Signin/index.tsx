import React, { FormEvent } from "react";
const BASE_URl = import.meta.env.VITE_BASE_URl
import { Layout, Space, Button, Checkbox, Form, Input } from 'antd';
import  styles from './index.module.css'
const Index = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return(

               <Form
                 name="basic"
                 labelCol={{ span: 8 }}
                 wrapperCol={{ span: 16 }}
                 style={{ maxWidth: 600}}
                 initialValues={{ remember: false }}
                 onFinish={onFinish}
                 onFinishFailed={onFinishFailed}
                 autoComplete="off"
               >
                 <Form.Item
                   label="Username"
                   name="username"
                   rules={[{ required: true, message: 'Please input your username!' }]}
                 >
                   <Input />
                 </Form.Item>

                 <Form.Item
                   label="Password"
                   name="password"
                   rules={[{ required: true, message: 'Please input your password!' }]}
                 >
                   <Input.Password />
                 </Form.Item>

                 <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                   <Checkbox>Remember me</Checkbox>
                 </Form.Item>

                 <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                   <Button type="primary" htmlType="submit">
                     Submit
                   </Button>
                 </Form.Item>
               </Form>
  )

}

export default Index
