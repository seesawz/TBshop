import React, {useEffect} from 'react'
import { Card,Divider,Input,Space,Button } from 'antd';
import Message from './component/Message';
import { already,createSession,selectUserRoleList } from '@/api/index';
import {useAppSelector} from '@/store/index'
import {useInput} from '@/Hooks/useInput'
const Index = () => {
    //从redux中获取用户信息
     const user = useAppSelector((state: any) => state.user.userInfo)
    /* 
     *  const sockt = new WebSocket('ws://localhost:8080/ws')
     *  sockt.addEventListener('open', () => {
     *          sockt.send('connect success')
     *      })
     */
    
     interface IconnectInfo {
      id: number
      listName: string
      toUserId: string
      unReadCount: number
      userId: string
    }
    type IMsg = {
            name: string
            message:string
            isMe: boolean
        }
    const [msgList,setMsgList] = React.useState<IMsg[]>([])
    const [adminInfo,setAdminInfo] = React.useState<any>({})
    const [connectInfo,setConnectInfo] = React.useState<IconnectInfo>()
    const getHistoryChat = () => {
    
        } 
    const message = useInput() 
    const [ws, setWs] = React.useState<any>(null)   
    //判断是否已经在聊天
    const IsChating =  () => {
       already(user.userId as string).then( (res) => {
           if(res.code === 0) {
            //如果等于0说明还未创建
            if(res.data.length === 0){
                    queryAdmin()
                }else{
                        //已经有会话
                     setConnectInfo(res.data[0])
                    //链接会话
                    console.log("connectInfo",connectInfo);
                    const ws = new WebSocket(`ws://43.139.230.109:9001/websocket/${user.userId}/${res.data[0]?.id}`)
                    setWs(ws)
                    ws.addEventListener('open', ()=>{
                            console.log("连接成功");
                        })
                    getHistoryChat()
                }
        }
        })
    }
    //查询管理员信息
    const queryAdmin = () => {
        selectUserRoleList().then(res => {
        if(res.code === 0) {
            console.log("res",res);
            setAdminInfo(res.data[0])
            createConnect()
        }
    })
    }
    //创建连接
    const createConnect = () => {
        const data = {
                userId: user.userId,
                adminId: adminInfo.userId,
                userName: user.userName,
            }
            createSession(data).then(res => {
                if(res.code === 0) {
                    console.log("创建成功");
                }
            })

        }

    //发送消息
    const sendMsg = () => {
            console.log(message);
            setMsgList([...msgList as IMsg[],{name: user.userName,message: message.value,isMe:true}]) 
        }
        useEffect(() => {
            IsChating()

            },[])
  return (
    <div className='bg-#ededed h-screen'>
      <div className='flex justify-center'>
        <Card className='mt-5 shadow-xl flex ' bodyStyle={{ margin: 0, padding: 0 }}>
          <div className='h-150 w-100% overflow-auto'>
            <div className="ml-2 mt-10 ">
              <Space direction={"vertical"} size={"large"}>
              {msgList?.map((item,index) => {
                    return <Message key={index} name={item.name} message={item.message} reserve={item.isMe}></Message>
                  })}  
              </Space>
            </div>
          </div>
          <Divider />
          <div className=' w-250 flex justify-center'>
            <Input value={message.value} onChange={message.onChange}  className="w-80%" placeholder="请输入"></Input>
            <Button type="primary" className="ml-5" onClick={sendMsg}>发送</Button>
          </div>
          <br/>
        </Card>
      </div>
    </div>
  )
}
export default Index
