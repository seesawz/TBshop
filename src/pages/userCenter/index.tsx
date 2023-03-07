import React from 'react';

import { useAppSelector } from '@/store/index'
import { Card, Avatar, Statistic } from 'antd';
const index = () => {
    const userInfo = useAppSelector(state => (state as any).user.userInfo)

    return (
        <div className='flex justify-center'>
            <div className='shadow w-3xl h-3xl flex justify-center'>
                <Card style={{ width: '100%' }}>
                    <Avatar size={64} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQ3m8AsJ3AgTb5qQGw--Jtx2mIGI-eun-6w&usqp=CAU">
                    </Avatar>
                    <span className='ml-10 color-gray-600'>这是我的个人描述巴拉巴拉，这是我的个人描述巴拉巴拉，这是我的个人描述巴拉巴拉</span>
                    <p className='text-2xl font-500'>{userInfo.userName}</p>
                    <div className='flex flex-wrap'>
                        {[1, 2, 3, 4].map((item: any) =>
                            item === 2 ?
                                <div key={item} className='w-60 h-70 ml-auto mt-5 mr-auto rounded-xl border-2 shadow-xl'>
                                    <div className='ml-5'>
                                    <Statistic title="已消费金额" value={1128} />
                                            <br />
                                            <br />
                                            <Statistic title="购物车总计" value={93} suffix="/ 100" />
                                    </div>
                                </div> :
                                <div key={item} className='w-60 h-70 ml-auto mt-5 mr-auto rounded-xl border-2 shadow-xl'></div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default index;