import React from 'react';

import { useAppSelector } from '@/store/index'
import { Card ,Avatar } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
const index = () => {
    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    console.log(userInfo);

    return (
        <div className='flex justify-center'>
            <div className='shadow w-3xl h-3xl flex justify-center'>
                <Card style={{ width: '100%' }}>
                <Avatar size={64} icon={<SmileOutlined twoToneColor="#eb2f96" />} />
                <p className='text-2xl font-500'>{userInfo.userName}</p>
                </Card>
            </div>
        </div>
    );
};

export default index;