import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const Message = (props:any) => {
        const {reverse = false} = props
    return(
      <div>
      { reverse ?
        <div >
            {/* 未反转状态 */}
            <div className='flex' >
                <Avatar icon={<UserOutlined />} />
                <div className="ml-5">
                    <p className="bg-#f9d5b7 pl-2 pr-2  break-all max-w-50 border-solid border-gray-500 border-opacity-20  rd-2">
                        你好，我是客服，有什么可以帮助你的吗?
                    </p>
                </div>
            </div>
        </div>
      :
        <div className="w-240">
            {/* 未反转状态 */}
            <div className='flex justify-end' >
                <div className="mr-5">
                    <p className="
                    bg-blueGray-2
                    pl-2
                    pr-2
                    break-all
                    max-w-50
                    border-solid
                    border-gray-500 border-opacity-20  rd-2">
                        你好，我是客服，有什么可以帮助你的吗?
                    </p>
                </div>
                <Avatar icon={<UserOutlined />} />
            </div>
        </div>
    }
      </div>
    )
};

export default Message;