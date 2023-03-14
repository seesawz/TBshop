import React, { useRef, useState } from "react";
import { Button, Form, Input,Radio, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { buyGoods, selectOrderItem } from '@/api';
import { useAppSelector } from '@/store';
import { Col, Row,Steps,Divider } from 'antd';

const index = () => {
    const location: any = useLocation()
    const form = useRef(null)
    const navigate = useNavigate()
    const Info = location.state?.data
    const description = 'Welcome!';
    const { TextArea } = Input
    const onFinish = async () => {
        const data: any = form.current.getFieldsValue()
        const result = await buyGoods({ ...data, ...location.state.data })
        if (result.code === 0) {
            message.success('下单成功')
            //跳转个人
            navigate('/userCenter')
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
           
            <div className="w-60% mt-10 ml-auto mr-auto   leading-10 ">
            <Steps
    current={1}
    items={[
      {
        title: '选择商品',
        description,
      },
      {
        title: '确认订单',
        description,
        subTitle: `Left-${new Date().toLocaleDateString()}`,
      },
      {
        title: '送货上门',
        description,
      },
    ]}
  />
            <h3>历史地址</h3>
            <div className="hover-bg-gray-100 rd-2 ">
                <Row>
                    <Col span={6} className="flex justify-end"><Radio></Radio></Col>
                    <Col span={4}>收货人:{'唐人'}</Col>
                    <Col span={6}>手机号:{'1233707823'}</Col>
                    <Col span={8}>地址:{'重庆市渝北区光电园信达国际'}</Col>
                </Row>
            </div>
            </div>
            <div className='flex ml-auto mr-auto w-60% mt-10'>
            

                <div className=" flex-1 flex-col">
                <h5>订单信息</h5>
                <div className="mt-5 color-coolGray-500 w-80%">
                <p className=" text-xl ">{Info?.spuName}</p>
                <p className="  ">数量:{Info?.number}</p>
                <p>单价:{Info?.price}</p>
                <br />
                <br />
                <br />
                <Divider orientation="left" className="w-10">总计</Divider>
                <p className="color-red-5 flex justify-end">¥{Math.floor(
                    Info?.number * Info?.price
                )}</p>
                </div>
                </div>
                <div className=" flex-1 flex-col">
                   
                    <h5>账户信息</h5>
                  <div className="mt-10">
                  <Form
                name="basic"
                ref={form}
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 16 }}
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="姓名"
                    name="receiverName"
                    rules={[{ required: true, message: '请输入姓名!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="receiverPhone"
                    rules={[{ required: true, message: '请输入手机号!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="地址"
                    name="receiverDetailAddress"
                    rules={[{ required: true, message: '请输入地址!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                <Button type="dashed" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default index;