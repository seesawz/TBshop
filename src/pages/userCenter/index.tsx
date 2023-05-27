import React, { useEffect, useRef, useState } from "react";

import { useAppSelector } from "@/store"
import { Card, Avatar, Button, Badge, Row, Col, Space, Tag, message, Modal, Form, Input } from 'antd';
import { applyDealer, deleteOrder, selectOrderItem, selectUserDetail, updateUser } from "@/api";
import type { Page } from "@/utils/type";
const index = () => {
    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    const [userDetail, setUserDetail] = useState<any>()
    const [orderList, setOrderList] = useState<any[]>([])
    const [result, setResult] = useState<string>('')
    const [page, setPage] = useState<Page>({
        pageNo: 1,
        pageSize: 9,
        total: 0
    })
    const editForm: any = useRef(null)
    //查询订单
    const getOrder = async () => {
        const data = {
            memberId: userInfo.userId
        }
        const result = await selectOrderItem(data)
        if (result.code === 0) {
            setOrderList(result.data.data)
            setPage({ ...page, total: result.data.total })
        }
    }

    const payOrder = async (item: any) => {
        const data = {
            spuName: item.orderItem?.spuName,
            orderSn: item.orderSn,
            totalAmount: item.totalAmount
        }
        window.open(`http://43.139.230.109:9002/audit/project/alipay/pay?subject=${data?.spuName}&traceNo=${data.orderSn}&totalAmount=${data.totalAmount}`)
    }

    const getDetial = async () => {
        const result = await selectUserDetail(userInfo.userId)
        if (result.code === 0) {
            setUserDetail(result.data)
        }
    }
    const confirm = async () => {
        setUserDetail({ ...userDetail, becauseReason: result })
        const data = userDetail
        data.becauseReason = result

        const res = await applyDealer(data)
        if (res.code === 0) {
            message.success('申请成功')
        } else {
            message.info(res.message)
        }
        setResultOpen(false)
    };


    useEffect(() => {
        getDetial()
        getOrder()
    }, [page.pageSize, page.pageNo])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
        //设置默认值

        setTimeout(() => {
            const form = editForm.current
            form.setFieldsValue(userDetail)
        }, 500);

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = async () => {
        const form = editForm.current
        const data = form.getFieldsValue()
        data.userId = userDetail.userId
        const result = await updateUser(data)
        if (result.code === 0) {
            message.success('修改成功')
            getDetial()
        } else {
            message.error('修改失败')
        }
        setIsModalOpen(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const deleteMyOrder = async (record: any) => {
        const result = await deleteOrder(record?.id)
        if (result.code === 0) {
            message.success('删除成功')
            getOrder()
        } else {
            message.error('删除失败')
        }
    }


    const [resultOpen, setResultOpen] = useState<boolean>(false)

    return (
        <div className='flex justify-center'>
            <Modal title="编辑个人信息" open={isModalOpen} onOk={onFinish} onCancel={handleCancel}>
                <Form
                    name="basic"
                    ref={editForm}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 12 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="昵称"
                        name="nickName"
                        rules={[{ required: true, message: 'Please input your nickName!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="手机号"
                        name="mobile"
                        rules={[{ required: true, message: 'Please input your mobile!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="请输入申请原因" open={resultOpen} onOk={confirm} onCancel={() => { setResultOpen(false) }}>
                <Input value={result} onChange={(e) => setResult(e.target.value)}></Input>
            </Modal>
            <div className='shadow w-3xl flex justify-center '>
                <Card style={{ width: '100%' }}>
                    <Avatar className="relative" size={64}
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png">
                    </Avatar>
                    {userDetail?.roleName ? <Tag className="absolute top-3" color="magenta">经销商</Tag> : <></>}
                    <span className='ml-10 color-gray-600'>

                    </span>
                    <p className='text-2xl font-500'>{userInfo.userName}</p>
                    <Space>
                        <Button className="ml-1" type='primary' onClick={showModal}>编辑</Button>
                        {userDetail?.roleName ? <></> :
                            <Button onClick={() => setResultOpen(true)}>申请成为经销商</Button>
                        }
                    </Space>
                    <br />
                    <br />
                    <p>我的订单&nbsp;&nbsp;&nbsp;</p>
                    {orderList?.map((item, idx) => {
                        return (
                            <Card key={idx} size="small" className="mt-10">
                                {/* <div className="flex justify-around leading-10">   */}
                                <Row className="leading-10">
                                    <Col span={5}>
                                        <span>订单号:{item?.orderSn.slice(0, 5)}</span>
                                    </Col>
                                    <Col span={4}>
                                        <span>姓名:{item.receiverName}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>手机号:{item.receiverPhone}</span>
                                    </Col>
                                    <Col span={4}>  <span>总价:¥{item.totalAmount}</span></Col>
                                    <Col span={5}>
                                        <Space>
                                            {item.status === '0' ?
                                                <Button type="primary" danger className="mt-1" onClick={() => { payOrder(item) }}>付款</Button>
                                                :
                                                <Button type="primary" disabled={true} danger className="mt-1" >已付款</Button>
                                            }
                                            <Button onClick={() => { deleteMyOrder(item) }}>删除</Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                    }
                </Card>
            </div>
        </div>
    );
};

export default index;
