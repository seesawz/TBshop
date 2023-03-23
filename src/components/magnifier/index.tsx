import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { Image, Space, Button, message } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import ImageList from '@/pages/Detail/components/ImageList/ImageList';
//放大镜组件
const index = (prop: any) => {

    //  const mask:HTMLElement = document.getElementById('mask')!
    //  const box:HTMLElement  = document.getElementById('box')!
    //  const big:HTMLElement  = document.getElementById('big')!
    //  const img:HTMLElement  = document.getElementById('img')!
    /*  const mask1 = useRef(null)
     const box1 = useRef(null)
     const big1 = useRef(null)
     const img1 = useRef(null)
 
   const changeOver = () => {
     console.log(1);
     const mask:any = mask1.current
     const big:any = big1.current
     mask.style.display = 'block';
     big.style.display = 'block';
   }
 
   const changeMove = (e:any) => {
     const mask:any = mask1.current
     const big:any = big1.current
     const box:any = box1.current
     const img:any = img1.current
         //得到的x和y是鼠标在盒子内的坐标  this指向box
         const x = e.pageX - box?.offsetLeft;
         const y = e.pageY - box?.offsetTop;
       //将获取到的鼠标的值给遮罩层（减去一半是因为让鼠标在遮罩层中央） 让它跟着鼠标移动
         let maskX = x - mask.offsetWidth / 2;
         let maskY = y - mask.offsetHeight / 2;
 
 
         //设置最大移动距离
         const maskWidth = box.offsetWidth - mask.offsetWidth;
         const maskHeight = box.offsetHeight - mask.offsetHeight;
         //控制mask移动的范围
         if (maskX <= 0) {
             maskX = 0;
         } else if (maskX >= maskWidth) {
             maskX = maskWidth;
         }
 
         if (maskY <= 0) {
             maskY = 0;
         } else if (maskY >= maskHeight) {
             maskY = maskHeight;
         }
         mask.style.left = maskX + 'px';
         mask.style.top = maskY + 'px';
         
          //大图最大移动距离
         const imgWidth = img.offsetWidth - big.offsetWidth;
         const imgHeight = img.offsetHeight - big.offsetHeight;
 
         //大图片的移动距离 = mask移动距离 * 大图最大移动距离 /mask的最大移动距离  
         const bigX = maskX * imgWidth / maskWidth;
         const bigY = maskY * imgHeight / maskHeight;
 
         //赋值
         img.style.left = (-bigX) + 'px';
         img.style.top = (-bigY) + 'px';
 
     } */
    const [visible, setVisible] = useState(false);
    const [imgIdx, setImgIdx] = useState<number>(0)
    const { images } = prop
    const [curImage, setCurImage] = useState<any>(`http://43.139.230.109:9002/img/${images[0]?.attachUrl?.split("/").at(-1)}`)

    const changeImage = (item: any, idx: number) => {
        setImgIdx(idx)
        setCurImage(`http://43.139.230.109:9002/img/${item?.attachUrl?.split("/").at(-1)}`)
    }

    const getChange = (current: number, prevCurrent: number) => {
        console.log(current, prevCurrent);
    }

    const changeIdx = (idx: number) => {
        if(imgIdx + idx <= 0){
            message.info('已经是第一张了')
            setImgIdx(0)
            return 
        }
        if(imgIdx + idx >= images.length){
            message.info('已经最底了')
            setImgIdx(images.length-1)
            return 
        }
        setImgIdx(imgIdx + idx)
        
    }
    useEffect(()=>{
        setCurImage(`http://43.139.230.109:9002/img/${images[imgIdx]?.attachUrl?.split("/").at(-1)}`)
    },[imgIdx])

    //   src={`http://43.139.230.109:9002/img/${curImage?.attachUrl?.split("/").at(-1)}`}
    return (
        <div>
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                }}>
                    <Image src={curImage}></Image>
                </Image.PreviewGroup>
            </div>
            <div className='w-xl h-xl  flex'>
                <img onClick={() => setVisible(true)} src={curImage} className='w-xl h-xl object-contain' alt="" />
            </div>
            {/* <div className=''> */}
            <div className='w-sm  mt-10 ml-20'>
                <Space>
                    <Button type="text" size="large" onClick={() => changeIdx(-1)}><DoubleLeftOutlined /></Button>
                    {images?.map((item: any, index: number) => {
                        return (
                            <img
                                key={index}
                                width={100}
                                height={100}
                                className='object-cover hover-border-orange hover-border-solid cursor-pointer'
                                src={`http://43.139.230.109:9002/img/${item?.attachUrl.split("/").at(-1)}`}
                                onMouseEnter={() => changeImage(item, index)}
                            />
                        )
                    })}
                    <Button type="text" size="large" onClick={() => changeIdx(1)}><DoubleRightOutlined /></Button>
                </Space>
            </div>
        </div>
    );
};


//规定props传入类型
//放大镜组件需要的prop
//图片数组
index.propTypes = {
    images: PropTypes.array,
}


export default index;