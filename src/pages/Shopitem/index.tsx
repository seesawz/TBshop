import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom'
import type { Page } from '@/utils/type'
import { selectGoodsInfoByUser } from '@/api'
import type { Goods } from '@/utils/type'
const Index = () => {

    const navigator = useNavigate()
    const toShopDetail = (item:Goods) => {
        navigator(`/detail?id=${item.goodsId}`)
    }
   
    
    const [page, setPage] = useState<Page>({
        pageNo: 1,
        pageSize: 9,
        total: 0
    })
    const [shopList, setShopList] = useState<Goods[]>([])
    const [isBottom,setIsBottom] = useState<boolean>(false)
    const getGoods = async () => {
        const result = await selectGoodsInfoByUser(page)
        if (result.code === 0) {
            setShopList(result.data.data)
            setPage({...page,total:result.data.total})
            if(result.data.data.length!== page.pageSize){
                setIsBottom(true)
            }
        }
    }

    useEffect(()=>{
     
        getGoods()
    },[page.pageSize])
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
           // document.body.scrollHeight 滚动条高度
           //当前滚动条位置document.documentElement.scrollTop
           //用当前滚动条位置+视口高度去对于是否等于滚动条高度就能判断是否到底部
           const scrollHeight:number = document.body.scrollHeight
           const curTop:number = document.documentElement.scrollTop 
            if( (document.body.offsetHeight + curTop) >= (scrollHeight-100)){
                setPage({...page,pageSize:page.pageSize+9})
            }
        })      
    },[])

    return (
        <div>
            <br />
            <br />
            <div style={{ display: 'flex', marginLeft: '25px' }}>
                <h2>猜你喜欢</h2>
                <img
                    style={{ marginLeft: '10px', width: '70px', height: '20px' }}
                    src="https://gw.alicdn.com/imgextra/i2/O1CN016b1mMM1FxJlsXfWhU_!!6000000000553-2-tps-96-30.png"
                    alt=""
                />
            </div>
            <div className='flex justify-around flex-wrap'>
                {shopList.map((item, idx) => (
                    <div onClick={()=>toShopDetail(item)} key={idx} className={styles.shoplist}>
                        <img className={styles.img}  src={`http://43.139.230.109:9002/img/${item.spuImgUrl.split("/").at(-1)}`} alt="" />
                        <p className={styles.shoptitle}>{item.spuName}</p>
                        <p className={styles.shopprice}>¥{item.price}</p>
                    </div>
                ))}
            </div>
            <div className='flex justify-center mt-15 color-gray-500'>
              { isBottom && <h4>没有更多了</h4>}  
            </div>
        </div>
    )
}

export default Index
