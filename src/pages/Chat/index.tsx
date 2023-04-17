import React from 'react'
import { Card, Avatar } from 'antd';
const { Meta } = Card;
const Index = () => {
  return (
    <div className='bg-#ededed h-screen'>
      <div className='flex justify-center'>
        <Card className='mt-5 shadow-xl w-250 h-170 flex' bodyStyle={{ margin: 0, padding: 0 }}>
          <div className='w-50 bg-#FBFBFD shadow h-full'>
            <div className='flex justify-center items-center'>
              <Card bordered={false}>
                <Meta
                  className='h-13'
                  avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>}
                  title="客服"
                  description="This is the description"
                />
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
export default Index
