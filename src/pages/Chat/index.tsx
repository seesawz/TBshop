import React from 'react'
import { Card,Divider,Input,Space,Button } from 'antd';
import Message from './component/Message';
const Index = () => {
  return (
    <div className='bg-#ededed h-screen'>
      <div className='flex justify-center'>
        <Card className='mt-5 shadow-xl flex ' bodyStyle={{ margin: 0, padding: 0 }}>
          <div className='h-150 w-100% overflow-auto'>
            <div className="ml-2 mt-10 ">
              <Space direction={"vertical"} size={"large"}>
              <Message reverse={true} />
              <Message  />
              <Message  />
              <Message  />
              <Message  />
              <Message  />
              <Message  />
              <Message  />
              </Space>
            </div>
          </div>
          <Divider />
          <div className=' w-250 flex justify-center' >
            <Input className="w-80%" placeholder="请输入"></Input>
            <Button type="primary" className="ml-5">发送</Button>
          </div>
          <br/>
        </Card>
      </div>
    </div>
  )
}
export default Index
