import { selectGoodsInfoByUser } from '@/api';
import { Page } from '@/utils/type';
import {Space,Pagination} from 'antd'
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const index = () => {
    const [seachParams] = useSearchParams()
    const navigate = useNavigate()
    const [keyWord, setKeyWord] = useState<string>(seachParams.get('searchWord') as string)
    const [searchList, setSearchList] = useState<any[]>([])
    const [page, setPage] = useState<Page>({
        pageNo: 1,
        pageSize: 8,
        total: 0
    })
    const searchShopList = async () => {
        const result = await selectGoodsInfoByUser({ ...page, keyWord: keyWord })
        if (result.code === 0) {
            setSearchList(result.data.data)
            setPage({ ...page, total: result.data.recordsTotal })
        }
    }
    const toShopDetail = (item: any) => {
        navigate('/detail?id=' + item.goodsId)
    }
    useEffect(() => {
        searchShopList()
    }, [page.pageNo])


    return (
        <div>
            <div>
                <header className='flex justify-center mt-10 flex-col items-center' >
                    <p>{keyWord}</p>
                    <span className='color-gray-400 text-sm'>({searchList.length}items)</span>
                </header>
                <div className='flex justify-evenly flex-wrap mt-5'>
                    {searchList.map((item: any, idx: number) =>
                        <div key={idx} onClick={() => { toShopDetail(item) }}
                            className='
                    w-78 
                    h-100
                    mt-10 flex flex-col items-center cursor-pointer border-solid
                  border-coolGray-200
                    b-rd-2'>
                            <img
                                className='w-70 h-70 rd-2 object-cover mt-2'
                                src={`http://43.139.230.109:9002/img/${item.spuImgUrl?.split("/").at(-1)}`} alt="网络错误" />
                            <p className='mt-2 text-xl'>{item.spuName}</p>
                            <p className='color-gray-400 text-sm -ml-5'>¥ {item.price}</p>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-end mt-10 mr-10'>
            <Pagination 
            current={page.pageNo}
             total={page.total} 
             hideOnSinglePage={true} 
             pageSize={page.pageSize}
             onChange={(cur:number)=>{setPage({...page,pageNo:cur})}}></Pagination>
            </div>
        </div>
    );
};

export default index;