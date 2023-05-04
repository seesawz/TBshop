import React from 'react'
import { Avatar, List,Button } from 'antd';
type Iremark = {
  avatar: string
  blogId: string
  commentDetailsListChild: any[]
  content: string
  id: number
  nickname: string
  parentId: number
  userId: any
}
type selfProps = {
  remark: Iremark[]
  submitDelete: (item:Iremark) => void
}
const Index: React.FC<selfProps> = (props) => {
  const { remark,submitDelete } = props
  const deleteComment = (item:Iremark) => {
     submitDelete(item) 
  }
  return (
    <div className='w-300'>
      <List
        itemLayout="horizontal"
        dataSource={remark}
        locale={{ emptyText: "暂无评论" }}
        renderItem={(item: Iremark, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
              title={<a>{item.nickname}</a>}
              description={item.content}
            />
            <Button type="text" danger onClick={() => deleteComment(item)}> 
             删除 
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
}
export default Index
