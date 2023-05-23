import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { message, Modal, notification,Tooltip } from 'antd'
import { UserOutlined, ShoppingCartOutlined, IssuesCloseOutlined, QuestionCircleOutlined,HomeOutlined } from '@ant-design/icons';
import { useproThemeContext } from '@/theme/hooks'
import img1 from '@/assets/12/headerbg1.png'
import img2 from '@/assets/12/headerbg2.png'
import img3 from '@/assets/12/headerbg3.png'
import img4 from '@/assets/12/headerbg4.png'
import bghead from '@/assets/headerbg.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken, resetToken } from '@/utils/token';
import {userLogout} from '@/api/index'
const Header = () => {
    const {isLoginShow,setLoginShow} = useproThemeContext()!
    const [isHome, setIsHome] = useState(true)

    const { isLogin, setIsLogin } = useproThemeContext()!
    const [api, contextHolder] = notification.useNotification()

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname !== '/') {
            setIsHome(false)
        } else {
            setIsHome(true)
        }
    })
    const showLogin = () => {
        const token = getToken() && getToken() || ''
        //如果没有登录就先登录，如果登录了就跳转个人中心
        if(token.length!==0){
            navigate('/userCenter')
            return 
        }
        navigate('/login')
        //通过是否有token判断是否登录
    }
    //注册
    const register = () => {
        setIsLogin(false)
        navigate('/login')
    }
    const openNotificationWithIcon = () => {
     const token = getToken() && getToken() || ''
        //如果没有登录就先登录，如果登录了就跳转个人中心
        if(token.length!==0){
            navigate('/chat')
            return 
        }
        navigate('/login')

    }
    const toCart = () => {
        navigate('cart')
    }
    const Logout = async() => {
        const result = await userLogout()
        if(result.code === 0){
            resetToken()
            navigate('/')
            message.info('退出成功')
        }
    }
    return (
        
        <div className={styles.head} style={{backgroundImage:`url(${bghead})`}}>
            {contextHolder}
            <div className={styles.headertitle}>
                {/*如果没有登录则弹出登录界面*/}
                <div className='flex-1 justify-start'>
                <Tooltip placement="bottomRight" title={"主页"}>
                    <span onClick={()=>navigate('/')}><HomeOutlined />主页</span>
                </Tooltip>
                </div>
                <div className='flex-1 flex justify-end mr-10'>
                    <Tooltip placement="bottomRight" title={"我的"}>
                        <span onClick={showLogin}><UserOutlined />我的</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"购物车"}>
                    <span onClick={toCart}><ShoppingCartOutlined />购物车</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"免费注册"}>
                    <span onClick={register}> <IssuesCloseOutlined />免费注册</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"联系客服"}>
                    <span onClick={openNotificationWithIcon}><QuestionCircleOutlined />联系客服</span>
                    </Tooltip>
                    <span  onClick={Logout}>&nbsp;&nbsp;退出登录</span>
                </div>
            </div>
            {isHome ? (<div className={styles.content}>
                <div>
                    <img src={img1} alt="" />
                    <span className={styles.bannertitle}>个性假发</span>
                    <span className={styles.bannerinfo}>随性自由搭配</span>
                </div>
                <div>
                    <img src={img2} alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
                <div>
                    <img src={img3}  alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
                <div>
                    <img src={img4}  alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
            </div>) : <></>
            }
        </div>
    )
}

export default Header
