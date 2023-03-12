import React, { useRef, useState } from "react";
import { Button, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyGoods, selectOrderItem } from '@/api';
import { useAppSelector } from '@/store';

const index = () => {
    const location:any = useLocation()
    const form = useRef(null)
    const navigate = useNavigate()

    const { TextArea } = Input
    const onFinish = async() => {
        const data:any = form.current.getFieldsValue()
        const result = await buyGoods({...data,...location.state.data})
        if(result.code === 0){
            //跳转个人
            navigate('/userCenter')
        }
    };
   
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex justify-center mt-20'>
            <Form
                name="basic"
                ref={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="姓名"
                    name="receiverName"
                    rules={[{ required: true, message: 'Please input your 姓名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="receiverPhone"
                    rules={[{ required: true, message: 'Please input your 手机号!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="receiverDetailAddress"
                    rules={[{ required: true, message: 'Please input your 地址!' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>




                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default index;