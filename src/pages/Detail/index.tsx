import React, { useEffect, useRef, useState } from 'react'
import { InputNumber, Button, Divider, Select, Form, Space, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addShoppingCart, selectSingleGoods } from '@/api'
import type { Goods } from '@/utils/type'
import {throttle} from '@/utils/index'
import { getToken } from '@/utils/token'
import {useAppSelector} from '@/store/index'
import Magnifier from '@/components/magnifier/index'
const Index = () => {
    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    const [search] = useSearchParams()
    const [token ,setoken] = useState<string>('')
    const [goodsInfo, setGoodsInfo] = useState<Goods | null>(null)
    const navigate = useNavigate()
    const form = useRef(null)
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
    };
    const getGoodsInfo = async () => {
        const id = search.get('id')
        const result = await selectSingleGoods({ goodsId: id })
        if (result.code === 0) {
            setGoodsInfo(result.data)
        }
    }
    const toPay = () => {
        if(token === undefined){
            message.info('请先登录')
           navigate('/login')
            return
        }
        const Form: any = form.current
        const { number } = Form.getFieldsValue()
        const data:Goods = goodsInfo!
        data.number = number
        navigate('/pay',{state:{data}})
    }
    const check = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const patt1 = new RegExp(/^[1-9]*[0-9][0-9]*$/)
        const result = patt1.test(e.target.value)
        if (!result) {
            (form.current as any).setFieldsValue({
                number: '1'
            })
            message.warning('请输入正整数')
        }
    }

    const addCart = throttle(  async() => {        
        if(token === undefined){
            message.info('请先登录')
           navigate('/login')
            return
        }
         const data = {
            spuId: goodsInfo?.goodsId,
            spuName: goodsInfo?.spuName,
            spuImg: goodsInfo?.spuImgUrl,
            number:'',
            price:goodsInfo?.price,
            spuDescription:goodsInfo?.spuDescription,
            memberId:userInfo.userId
        }
        const Form: any = form.current
        const { number } = Form.getFieldsValue()
        data.number = number
        const result = await addShoppingCart(data)
        if(result.code === 0){
            message.success('加入购物车成功')
        } 
    },500)

    useEffect(() => {
        getGoodsInfo()
        const a:string = getToken() as string
        setoken(a)
    }, [])


    return (
        <div className='h-screen ml-20'>
            <div className="flex justify-center ">
                <div className='flex-1'>
                    {/* <div className='flex justify-center'>
                        {
                            goodsInfo?.spuImgUrl && <img
                                className='mt-20 h-xl w-xl object-contain rd-5'
                                src={`http://43.139.230.109:9002/img/${goodsInfo?.spuImgUrl.split("/").at(-1)}`} alt="" />}
                    </div> */}
                    <div className='flex justify-center mt-20'>
                    {goodsInfo?.projectAttachList && <Magnifier images={goodsInfo?.projectAttachList}></Magnifier>}
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='mt-30'>
                        <h2>{goodsInfo?.spuName}</h2>
                        <br />
                        <p className='color-red text-xl'>¥{goodsInfo?.price}</p>
                        <br />
                        <br />
                        <h5>剩余库存数:{goodsInfo?.number}</h5>
                        <Divider></Divider>
                        <Form
                            ref={form}
                        >
                           {/*  <Form.Item
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
                            <Divider></Divider> */}
                            <Form.Item
                                {...formItemLayout}
                                rules={[{ required: true, message: '请选择下单数量' }]}
                                name='number'
                                initialValue="1"
                                label="数量">
                                <InputNumber  min={1} max={goodsInfo?.number} step={1} onBlur={(e) => { check(e) }}></InputNumber>
                            </Form.Item>
                        </Form>
                        <br />
                        <h5>商品描述</h5>
                        <p className='mt-5 w-sm text-sm color-coolgray500'>{goodsInfo?.spuDescription} </p>
                        <div className='mt-5 w-sm text-sm color-coolgray500'>
                            <p>Features: </p>
                            <ul>
                                <li>产地:{goodsInfo?.address} </li>
                                <li>Available in dark heather charcoal with the white Google logo screen printed across center chest.</li>
                            </ul>
                        </div>
                        <br />
                        <Space>
                      
                            <Button type="primary" onClick={addCart} ghost style={{ width: '100%' }} >加入购物车</Button>
                            <Button type="primary" onClick={toPay} danger ghost style={{ width: '100%' }} >立即购买</Button>
                           
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index


