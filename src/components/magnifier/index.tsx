import React, {  useRef, useState } from 'react';
import PropTypes from 'prop-types'
//放大镜组件
const index = (prop: any) => {

        //  const mask:HTMLElement = document.getElementById('mask')!
        //  const box:HTMLElement  = document.getElementById('box')!
        //  const big:HTMLElement  = document.getElementById('big')!
        //  const img:HTMLElement  = document.getElementById('img')!
    const mask1 = useRef(null)
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

    }
    
    const { images } = prop
   const [curImage,setCurImage] = useState<any>(`http://43.139.230.109:9002/img/${images[0]?.attachUrl?.split("/").at(-1)}`)
    const changeImage = (item:any) => {
        setCurImage(`http://43.139.230.109:9002/img/${item?.attachUrl?.split("/").at(-1)}`)
    }
    //   src={`http://43.139.230.109:9002/img/${curImage?.attachUrl?.split("/").at(-1)}`}
    return (
        <div>
            <div ref={box1} className='w-xl h-xl relative float-left -ml-20 flex  ' id="box"  
            onMouseEnter={changeOver}
            onMouseMove={()=>changeMove(event)}
            onMouseLeave={()=>{
                mask1.current.style.display = 'none';
                big1.current.style.display = 'none';
            }}
            >
            <img  src={curImage} className='w-xl h-xl object-contain absolute top-0 left-0 ml-30' alt="" />
            <div  ref={mask1} id="mask" className='h-50 w-50 top-0 left-0 absolute cursor-move opacity-50 bg-sky' style={{display:'none'}}></div> 
            </div>
            <div className='overflow-hidden display-none z-1001 relative w-xl h-xl -top-150 left-110'  ref={big1} id='big'>
                <img ref={img1} src={curImage} id="img" className='absolute top-0 left-0' alt="" />
            </div>
            <div className='w-sm flex mt-150 ml-auto mr-auto justify-around'>
               {images?.map((item:any,index:number)=>{
                return (
                    <img
                    key={index}
                    width={100}
                    height={100}
                    className='object-cover hover-border-orange hover-border-solid cursor-pointer' 
                    src={`http://43.139.230.109:9002/img/${item?.attachUrl.split("/").at(-1)}`}
                    onMouseEnter={()=>changeImage(item)}
                />
                )
               })}
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