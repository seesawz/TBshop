import { Avatar, List } from 'antd';
import React from 'react'
const Index = () => {
  type Iremark = {
    userName: string,
    remark: string,
  }  
  const data: Iremark[] = [
  {
    userName: 'User1',
    remark: '非常不错，我买过，很喜欢，下次还会来'
  },
  {
    userName: 'User2',
    remark: '非常不错，我买过，很喜欢，下次还会来'
  },
  {
    userName: 'User3',
    remark: '非常不错，我买过，很喜欢，下次还会来'
  },
  {
    userName: 'User3',
    remark: '非常不错，我买过，很喜欢，下次还会来'
  },
];

  return (
  <div className='w-300'>
   <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item:Iremark, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a>{item.userName}</a>}
          description={item.remark}
        />
      </List.Item>
    )}
  />
  </div>
);
}
export default Index
