import React from 'react'

import { InputNumber, Button, Divider, Select, Form } from 'antd'
const Index = () => {
    const onchangeNumber = () => void {}
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };
    return (
        <div className='h-screen ml-20'>
            <div className="flex justify-center ">
                <div className='flex-1 '>
                    <div className='flex justify-center'>
                        <img
                            className='mt-20'
                            src="https://shop.polymer-project.org/es6-bundled/data/images/10-14154A.jpg" alt="" />
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='mt-30'>
                        <h2>Anvil L/S Crew Neck - Grey</h2>
                        <br />
                        <p className='color-coolgray500'>$22.15</p>
                        <br />
                        <br />
                        <Divider></Divider>
                        <Form>
                            <Form.Item
                                {...formItemLayout}
                                label="size">
                                <Select
                                    defaultValue="lucy"
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                        { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                />
                            </Form.Item>
                            <Divider></Divider>
                            <Form.Item
                                {...formItemLayout}
                                label="Qniaty">
                                <Select
                                    defaultValue="lucy"
                                    options={[
                                        { value: 'jack', label: 'Jack' },
                                        { value: 'lucy', label: 'Lucy' },
                                        { value: 'Yiminghe', label: 'yiminghe' },
                                        { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                />
                            </Form.Item>
                        </Form>
                        <br />
                        <h5>Description</h5>
                        <p className='mt-5 w-sm text-sm color-coolgray500'>Youll be swooning over this crew neck as soon as you feel how soft it is. </p>
                        <div className='mt-5 w-sm text-sm color-coolgray500'>
                            <p>Features: </p>
                            <ul>
                                <li>40% preshrunk ring-spun cotton, 60% polyester terry fleece. </li>
                                <li>Available in dark heather charcoal with the white Google logo screen printed across center chest.</li>
                            </ul>
                        </div>
                        <br />
                        <Button type="primary" danger ghost  style={{ width: '22%' }} >ADD To Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index