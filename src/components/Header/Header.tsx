import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { Modal, notification,Tooltip,Breadcrumb } from 'antd'
import { UserOutlined, ShoppingCartOutlined, IssuesCloseOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useproThemeContext } from '@/theme/hooks'
import Signin from '@/pages/Signin'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '@/utils/token';
const Header = (props:any) => {
    const {info} = props
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
        setIsLogin(true)
        setLoginShow(true)
        //通过是否有token判断是否登录
    }
    //注册
    const register = () => {
        setIsLogin(false)
        setLoginShow(true)
    }
    const openNotificationWithIcon = () => {
        api['warning']({
            message: '客服功能暂未上线',
            description: '抱歉 客服功能暂未上线，您可以在后续更新中了解到更多信息。'
        })
    }

    return (
        
        <div className={styles.head}>
            {contextHolder}
            <Modal
                title={isLogin ?'登录':'注册'}
                centered
                destroyOnClose={true}
                open={isLoginShow}
                footer={null}
                onOk={() => setLoginShow(false)}
                onCancel={() => setLoginShow(false)}
                width={370}
            >
                <Signin info={info}></Signin>
            </Modal>
            <div className={styles.headertitle}>
                {/*如果没有登录则弹出登录界面*/}
                <div className='flex-1'></div>
                <div className='flex-1 flex justify-end mr-10'>
                    <Tooltip placement="bottomRight" title={"我的"}>
                        <span onClick={showLogin}><UserOutlined />我的</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"购物车"}>
                    <span><ShoppingCartOutlined />购物车</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"免费注册"}>
                    <span onClick={register}> <IssuesCloseOutlined />免费注册</span>
                    </Tooltip>
                    <Tooltip placement="bottomRight" title={"联系客服"}>
                    <span onClick={openNotificationWithIcon}><QuestionCircleOutlined />联系客服</span>
                    </Tooltip>
                </div>
            </div>
            {isHome ? (<div className={styles.content}>
                <div>
                    <img src="src/assets/headerbg1.png" alt="" />
                    <span className={styles.bannertitle}>小炒盖饭</span>
                    <span className={styles.bannerinfo}>罗俊真的爱吃</span>
                </div>
                <div>
                    <img src="src/assets/headerbg2.png" alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
                <div>
                    <img src="src/assets/headerbg3.png" alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
                <div>
                    <img src="src/assets/headerbg4.png" alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
                </div>
            </div>) : <></>
            }
        </div>
    )
}

export default Header
