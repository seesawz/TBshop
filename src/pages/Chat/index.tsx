import React, {useEffect, useLayoutEffect} from 'react'
import { Card,Divider,Input,Space,Button,message as msg } from 'antd';
import Message from './component/Message';
import { already,createSession,selectUserRoleList,msgInfo } from '@/api/index';
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
      id: string
      listName: string
      toUserId: string
      unReadCount: number
      userId: string
    }
 type IMsg = Root2[]

 interface Root2 {
  content: string
  createTime: string
  fromUserId: string
  fromUserName: string
  id: number
  toUserId: string
  toUserName: string
  unReadFlag: number
}
    const [msgList,setMsgList] = React.useState<IMsg>([])
    const [adminInfo,setAdminInfo] = React.useState<any>({})
    const [connectInfo,setConnectInfo] = React.useState<IconnectInfo>()
    const [messageApi, contextHolder] = msg.useMessage()
    const getHistoryChat = (id: string) => {
        msgInfo(id).then(res=>{
                if(res.code === 0){
                        console.log("历史记录",res);
                        setMsgList(res.data)
                    }
            })
        //scrollToBottom()
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
                    ws.addEventListener('message', (e: any) => {
                    console.log("接收到消息",e);
                    getHistoryChat(res.data[0]?.id)
                    
                })
                    getHistoryChat(res.data[0]?.id)
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
        if(message.value === "" || message.value === null){
                messageApi.warning('消息不能为空')
                return
            }
            ws.send(message.value)
            getHistoryChat(connectInfo?.id as string)
           message.setValue('')    
        }
    const enterSend =(e:KeyboardEvent | undefined) =>{
           if(e?.key === 'Enter'){
                sendMsg()
               }
            
        }

    //发送完消息滑动到底部
     const scrollToBottom = () => {
           const chatView:HTMLElement | null = document.getElementById('chatView') 
           chatView?.scrollIntoView(false)
    } 
        useEffect(() => {
            IsChating()
            },[])
        useLayoutEffect(()=>{
            scrollToBottom()
            },[msgList])
        useEffect(() => {
              // return ws?.close()
            })
  return (
    <div className='bg-#ededed h-screen'>
        {contextHolder}
      <div className='flex justify-center'>
        <Card className='mt-5 shadow-xl flex ' bodyStyle={{ margin: 0, padding: 0 }}>
          <div className='h-150 w-100% overflow-auto'>
            <div className="ml-2 mt-10 " id="chatView">
              <Space direction={"vertical"} size={"large"}>
              {msgList?.map((item,index) => {
                    return <Message key={index} content={item.content} 
                    reverse={item.fromUserId === user.userId ? false : true}>
                    </Message>
                  })}  
              </Space>
            </div>
          </div>
          <Divider />
          <div className=' w-250 flex justify-center'>
            <Input value={message.value} onChange={message.onChange} onKeyUp={()=>{enterSend(event)}}  className="w-80%" placeholder="请输入"></Input>
            <Button type="primary" className="ml-5" onClick={sendMsg} >发送</Button>
          </div>
          <br/>
        </Card>
      </div>
    </div>
  )
}
export default Index
