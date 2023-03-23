import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    message
} from 'antd'
import { setToken } from '@/utils/token'
import { useproThemeContext } from '@/theme/hooks'
import { applyVerificationCode, userLoginForname, userRegister } from '@/api/index'
import {SAVEUSERINFO} from '@/store/module/userSlice'
import { useAppSelector,useAppDispatch } from '@/store/index'
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom'
import { NoticeType } from 'antd/es/message/interface'
import { debounced } from '@/utils'
const Index = (props: any) => {
    const info = (type:NoticeType,msg:string) => {
        messageApi.open({
          type,
          content:msg
        })
      }
      const [messageApi, contextHolder] = message.useMessage()
    const userInfo = useAppSelector(state => (state as any).user.userInfo)
    
    //props
 
    const { Search } = Input

    //types
    //普通账号密码登录
    type AccountLogin = {
        userName: string,
        password: string,
    }
    //手机号登录
    type phoneLogin = {
        phoneNumber: string,
        verificationCode: string,
    }

    //state
    const { isLogin, setIsLogin } = useproThemeContext()!
    const { setLoginShow } = useproThemeContext()!
    const navigate = useNavigate()
    const [phoneLogin, setPhoneLogin] = useState<boolean>(true)
    const [accountLogin, setAccountLogin] = useState<AccountLogin>({
        userName: '',
        password: '',
    })
    const [accountRegister, setAccountRegister] = useState<AccountLogin>({
        userName: '',
        password: '',
    })
    const [userPhoneLogin, setUserPhoneLogin] = useState<phoneLogin>({
        phoneNumber:'',
        verificationCode:'',
    })
    const [veriTime, setVeriTime] = useState('发送')
    const dispatch = useAppDispatch()


    //methods
    const onFinish = async () => {
        const result = await userLoginForname(accountLogin)
        if (result.code === 0) {
            setToken(result.data.token)
            info('success', '登录成功')
            dispatch(SAVEUSERINFO(result.data))
            navigate('/')
        } else {
            info('error', result.message)
        }

    }
    const onFinishPhone = async () => {
        const data = {
            phone:userPhoneLogin.phoneNumber,
            code:userPhoneLogin.verificationCode
        }
        const result = await userLoginForname(data)
        if (result.code === 0) {
            setToken(result.data.token)
            info('success', '登录成功')
            dispatch(SAVEUSERINFO(result.data))
            navigate('/')
        } else {
            info('error', result.message)
        }
    }
    const onRegister = async () => {
        const result = await userRegister(accountRegister)
        if (result.code === 0) {
            setIsLogin(true)
            info('success', '注册成功',)
        } else {
            info('error', result.message,)
        }
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }
    const sendsendVerificationCode = debounced(async() => {
        if(veriTime!=='发送'){
            messageApi.open({type:'warning',content: '验证码发送中请不要重复发送'})
            return 
        }
        if(userPhoneLogin.phoneNumber.length!== 11){
            messageApi.open({type:'error',content: '手机号码错误'})
            return
        }
        
        const result = await applyVerificationCode({phone:userPhoneLogin.phoneNumber})
        if(result.code === 0){
            messageApi.open({
                type: 'success',
                content: '验证码已发送',
              });
            let i = 60
            const timer = setInterval(() => {
                setVeriTime(`${i}s`)
                i--
                if (i <= 0) {
                    clearInterval(timer)
                    setVeriTime('发送')
                }
            }, 1000)
           
        }
    },1000)

    const {phoneT} = props

    return isLogin ? (
        <>
        {contextHolder}
            {!phoneT ?
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 300 }}
                    initialValues={{ remember: false }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="userName"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input 
                         size="large"
                        value={accountLogin.userName} onChange={(e) => {
                            setAccountLogin({
                                userName: e.target.value,
                                password: ''
                            })
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                       
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password 
                         size="large"
                        value={accountLogin.password} onChange={(e) => {
                            setAccountLogin({
                                userName: accountLogin.userName,
                                password: e.target.value
                            })
                        }} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                        <Button
                            onClick={() => {
                                setIsLogin(false)
                            }}
                            style={{ marginLeft: '10px' }}
                            type="default"
                            htmlType="submit"
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form> :
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 300 }}
                    initialValues={{ remember: false }}
                    onFinish={onFinishPhone}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[{ required: true, message: '请输入手机号!' },
                        { min: 11, max: 11, message: '手机号为11位' }]}
                    >
                        <Search
                            allowClear
                            enterButton={veriTime}
                            size="middle"
                            onSearch={sendsendVerificationCode}
                            value={userPhoneLogin.phoneNumber}
                            onChange={(e)=>{setUserPhoneLogin({
                                ...userPhoneLogin,
                                phoneNumber: e.target.value
                            })}}
                        />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="verificationCode"
                        rules={[{ required: true, message: '请输入验证码!' },
                        { min: 4, max: 6, message: '验证码错误' }]}
                    >
                        <Input 
                        onChange={(e)=>{setUserPhoneLogin({
                            ...userPhoneLogin,
                            verificationCode: e.target.value
                        })}}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            }

        </>
    ) : (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 300 }}
                initialValues={{ remember: false }}
                onFinish={onRegister}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="userName"
                    rules={[{ required: true, message: '请输入用户名!' },
                    { min: 3, max: 11, message: '长度在3-11个字符' }]}
                >
                    <Input value={accountRegister.userName} onChange={(e) => {
                        setAccountRegister({
                            userName: e.target.value,
                            password: ''
                        })
                    }} />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' },
                    { min: 6, max: 15, message: '长度在6-15个字符' }]}
                >
                    <Input.Password value={accountRegister.password} onChange={(e) => {
                        setAccountRegister({
                            ...accountRegister,
                            password: e.target.value,
                        })
                    }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认注册
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        type="default"
                        onClick={() => {
                            setIsLogin(true)
                        }}
                        htmlType="submit"
                    >
                        去登陆
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default Index
