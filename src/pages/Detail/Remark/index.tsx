import { Avatar, List } from 'antd';
import React from 'react'
const Index = () => {
  const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

  return (
  <div className='w-300'>
   <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<a>{item.title}</a>}
          description="非常不错，我买过，很喜欢，下次还会来"
        />
      </List.Item>
    )}
  />
  </div>
);
}
export default Index
