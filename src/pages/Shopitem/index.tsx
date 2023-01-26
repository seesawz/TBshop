import React, { useState } from "react";
import styles from './index.module.css'
const Index = () => {
  type Shop = {
    img:string
    price:string | number
    title:string
  }
  const [shopList,setShopList] = useState<Shop[]>(
    [
      {
      img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
      price:'49.4',
      title:`泽塔奥特特曼升华器变换声光变身器儿童玩具黑暗`
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      },
      {
        img:'https://gw.alicdn.com/bao/uploaded/i2/2201049392895/O1CN01zJM6E71XFxPeNsEKP_!!0-item_pic.jpg_300x300q90.jpg_.webp',
        price:'49.4',
        title:'泽塔奥特特曼升华器变换\n' +
          '声光变身器儿童玩具黑暗'
      }
    ]
  )
  return (
    <div>
      <br/><br/>
      <div style={{display:'flex',marginLeft:'25px'}}>
        <h2>猜你喜欢</h2>
        <img style={{marginLeft:'10px',width:'70px',height:'20px'}} src="https://gw.alicdn.com/imgextra/i2/O1CN016b1mMM1FxJlsXfWhU_!!6000000000553-2-tps-96-30.png" alt="" />
      </div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'start'}}>
        {shopList.map((item,idx) =>(
          <div key={idx} className={styles.shoplist}>
            <img  className={styles.img} src={item.img} alt="" />
            <p className={styles.shoptitle}>{item.title}</p>
            <p className={styles.shopprice}>¥{item.price}</p>
        </div>))}
      </div>
    </div>
  );
};

export default Index;