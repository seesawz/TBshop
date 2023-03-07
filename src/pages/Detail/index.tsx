import React, { useEffect, useState } from 'react'
import { InputNumber, Button, Divider, Select, Form } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { selectSingleGoods } from '@/api'
import type { Goods } from '@/utils/type'
const Index = () => {
   
 const [search] = useSearchParams()
 const [goodsInfo,setGoodsInfo] = useState<Goods | null>(null)


    const onchangeNumber = () => void {}
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };
    const getGoodsInfo = async() => {
        const id = search.get('id')
        const result =  await selectSingleGoods(id as string)
        if(result.code === 0){
            setGoodsInfo(result.data)
        }
    }
    useEffect(()=>{
        getGoodsInfo()
    },[])


    return (
        <div className='h-screen ml-20'>
            <div className="flex justify-center ">
                <div className='flex-1 '>
                    <div className='flex justify-center'>
                        <img
                            className='mt-20 h-xl w-xl object-contain b-rd-8'
                            src={`http://43.139.230.109:9002/img/${goodsInfo?.spuImgUrl.split("/").at(-1)}`} alt="" />
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='mt-30'>
                        <h2>{goodsInfo?.spuName}</h2>
                        <br />
                        <p className='color-coolgray500'>¥{goodsInfo?.price}</p>
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
                        <p className='mt-5 w-sm text-sm color-coolgray500'>{goodsInfo?.spuDescription} </p>
                        <div className='mt-5 w-sm text-sm color-coolgray500'>
                            <p>Features: </p>
                            <ul>
                                <li>40% preshrunk ring-spun cotton, 60% polyester terry fleece. </li>
                                <li>Available in dark heather charcoal with the white Google logo screen printed across center chest.</li>
                            </ul>
                        </div>
                        <br />
                        <Button type="primary" danger ghost style={{ width: '22%' }} >加入购物车</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index