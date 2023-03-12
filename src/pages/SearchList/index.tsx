import { selectGoodsInfoByUser } from '@/api';
import { Page } from '@/utils/type';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const index = () => {
    const [seachParams] = useSearchParams()
    const [keyWord,setKeyWord] = useState<string>(seachParams.get('searchWord') as string)
    const [searchList,setSearchList] = useState<any []>([])
    const [page, setPage] = useState<Page>({
        pageNo: 1,
        pageSize: 8,
        total: 0
      })
    const searchShopList = async() => {
        const result = await selectGoodsInfoByUser({...page,keyWord:keyWord})
        if(result.code === 0){
            setSearchList(result.data.data)
            setPage({...page,total:result.data.total})
        }
    }

    useEffect(()=>{
        searchShopList()
    },[page.pageNo])


    return (
        <div>
          <div>
            <header className='flex justify-center mt-10 flex-col items-center' >
                <p>{keyWord}</p>
                <span className='color-gray-400 text-sm'>({searchList.length}items)</span>
            </header>
            <div className='flex justify-evenly flex-wrap mt-5'>
                {searchList.map((item:any,idx:number) => 
                    <div key={idx} className='w-78 h-100 mt-10 flex flex-col items-center'>
                        <img 
                        className='w-70 h-70 rd-2' 
                        src="https://gw.alicdn.com/imgextra/i2/2273269005/O1CN01S6mmGg2GOLLFr6Uy2_!!0-item_pic.jpg_Q75.jpg_.webp" alt="" />
                        <p className='mt-2 text-xl'>{item.spuName}</p>
                        <p className='color-gray-400 text-sm -ml-5'>¥ {item.price}</p>
                    </div>
                )}
            </div>
          </div>
        </div>
    );
};

export default index;