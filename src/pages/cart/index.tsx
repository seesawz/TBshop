import React from 'react';

const index = () => {
    return (
        <div>
            <div className=' flex justify-center mt-10'>
            购 物 车
            </div>
            <div className=' flex justify-center text-sm color-gray-4'>
            (一共{1} 件商品)
            </div>
            <br />
            <br />
            <div className=' flex justify-center  color-gray-4'>
           <div>
           {[1,2,3].map((item,index) => 
               (
                <div key={index} className='flex mt-15 leading-14 justify-between w-2xl appearance-none'>
               <img className='w-14 h-14' 
               src="https://shop.polymer-project.org/esm-bundled/data/images/10-15041B.jpg" alt=""  />
   
               <span>name</span>
               <span>desc</span>
               <span>num:
                   <select className='border-none bg-transparent w-12' name="num" id="num">
                       <option value="1">1</option>
                       <option value="2">2</option>
                   </select>
                   </span>
               <span>price</span>
               </div>
               )
            )}
           </div>
            </div>
        </div>
    );
};

export default index;