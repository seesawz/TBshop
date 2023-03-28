import React, { useEffect, useState } from 'react';
import { Button, message, Space } from "antd";
import {useAppSelector} from '@/store/index'
import { selectShoppingCart,deleteShoppingCart } from '@/api';
import { useNavigate } from "react-router-dom";
const index = () => {
  const navigate = useNavigate()
    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    const [cartList,setCartList] = useState<any []>([])

    const deleteCartList = async(item:any) => {
       const result = await deleteShoppingCart(item.id)
        if(result.code === 0){
            message.success('删除成功')
            getCart()
        }else{
            message.error('删除失败 ')
        }
    }
    const getCart = async() => {
        const result = await selectShoppingCart()
        if(result.code === 0) {
            console.log(result);
            setCartList(result.data)
        }
    }
    // 确认订单
    const submitOrder = async (order:any) => {
      console.log(order);
      navigate('/pay',{state:{order}})
    }

    useEffect(()=>{
        getCart()
    },[])

    return (
        <div>
            <div className=' flex justify-center mt-10'>
            购 物 车
            </div>
            <div className=' flex justify-center text-sm color-gray-4'>
            (一共{cartList?.length} 件商品)
            </div>
            <br />
            <br />
            <div className=' flex justify-center  color-gray-4'>
           <div>
           {cartList.map((item,index) => 
               (
                <div key={index} className='flex mt-15 leading-14 justify-between w-2xl appearance-none'>
               <img className='w-14 h-14 object-contain' 
               src={`http://43.139.230.109:9002/img/${item.spuImg?.split("/").at(-1)}`} alt="" />
   
               <span>商品名:{item.spuName}</span>
               <span>描述:{item.spuDescription.slice(0,7)}</span>
               <span>数量:{item.number} </span>
               <span>价格:{item.price * item.number}</span>
                  <Space>
                    <Button type="primary" onClick={()=>{submitOrder(item)}}>下单</Button>
                <Button className='mt-3'  onClick={()=>{deleteCartList(item)}}>删除</Button>
                  </Space>
               </div>
               )
            )}
           </div>
            </div>
        </div>
    );
};

export default index;