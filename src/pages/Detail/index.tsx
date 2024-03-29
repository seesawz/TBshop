import React, { useEffect, useRef, useState } from 'react'
import { InputNumber, Button, Divider, Input, Form, Space, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { addShoppingCart, selectSingleGoods, selectComment, addComment, deleteComment } from '@/api'
import type { Goods } from '@/utils/type'
import { throttle } from '@/utils/index'
import { getToken } from '@/utils/token'
import { useAppSelector } from '@/store/index'
import Magnifier from '@/components/magnifier/index'
import Remark from './components/Remark/index'
import { useInput } from "@/Hooks/useInput"
import { reject } from 'lodash'
const Index = () => {
    const { TextArea } = Input;

    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    const [search] = useSearchParams()
    const [token, setoken] = useState<string>('')
    const [goodsInfo, setGoodsInfo] = useState<Goods | null>(null)
    const [remarkList, setRemarkList] = useState<any[]>([])
    const pushRemark = useInput()
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
            getRemark(result.data)
        } 
    }
    const toPay = () => {
        if (token === undefined) {
            message.info('请先登录')
            navigate('/login')
            return
        }
        const Form: any = form.current
        const { number } = Form.getFieldsValue()
        const data: Goods = goodsInfo!
        data.number = number
        navigate('/pay', { state: { data } })
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

    const addCart = throttle(async () => {
        if (token === undefined) {
            message.info('请先登录')
            navigate('/login')
            return
        }
        const data = {
            spuId: goodsInfo?.goodsId,
            spuName: goodsInfo?.spuName,
            spuImg: goodsInfo?.spuImgUrl,
            number: '',
            price: goodsInfo?.price,
            spuDescription: goodsInfo?.spuDescription,
            memberId: userInfo.userId
        }
        const Form: any = form.current
        const { number } = Form.getFieldsValue()
        data.number = number
        const result = await addShoppingCart(data)
        if (result.code === 0) {
            message.success('加入购物车成功')
        }
    }, 500)
    //查询评论
    const getRemark = async (info:Goods) => {
        const result = await selectComment(info!.goodsId)
        if (result.code === 0) {
            setRemarkList(result.data)
        }
    }
    //发布评论
    const postComments = () => {
        if (pushRemark.value === '' || pushRemark.value === undefined) {
            message.warning('请输入评论内容')
            return
        }
        const data = {
            "nickname": userInfo.userName, //用户名
            "content": pushRemark.value,  //评论内容
            "blogId": goodsInfo?.goodsId,    //商品ID
            "avatar": null    //头像
        }
        addComment(data).then(res=>{
            if(res.code === 0){
                message.success('评论成功')
                getRemark(goodsInfo!)
                pushRemark.setValue('')
            }
        }).catch(err => console.log(err));
    }
    const submitDelete = (item:any) => {
        const data = {
            userId: userInfo.userId,
            id: item.id
        }
       deleteComment(data).then(res=>{
        if(res.code === 0){
            message.success('删除成功')
            getRemark(goodsInfo!)
        }else{
            message.error('删除失败')
        }
       }).catch(err => {
        message.error('删除失败')
       })
    }

    useEffect(()=> {
        getGoodsInfo()
        const a: string = getToken() as string
        setoken(a)
    }, [])
   

    return (
        <div className='h-screen ml-20'>
            <div className="flex justify-center ">
                <div className='flex-1'>
                    <div></div>
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
                                <InputNumber min={1} max={goodsInfo?.number} step={1} onBlur={(e) => { check(e) }}></InputNumber>
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
            <br />
            <h3>评论区</h3>
            <br></br>
            <div className='flex justify-center'>
                {/* 评论区 */}
                <Remark submitDelete={submitDelete} remark={remarkList}></Remark>
            </div>
            <div className='ml-25'>
                <br></br>
                <Space>
                    <Input value={pushRemark.value} 
                     onChange={pushRemark.onChange} 
                     className='w-50' 
                     placeholder='发表你的评论'
                     onKeyUp={(e) => {if(e.key === 'Enter'){postComments()}}}
                     ></Input>
                    <Button type="primary" ghost onClick={postComments}>发表</Button>
                </Space>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default Index


