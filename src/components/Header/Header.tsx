import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { Modal, notification } from 'antd'
import { useproThemeContext } from '@/theme/hooks'
import Signin from '@/pages/Signin'
import { useLocation } from 'react-router-dom'
const Header = () => {
    
    const [modal2Open, setModal2Open] = useState(false)
    const [isHome,setIsHome] = useState(true)

    const { isLogin, setIsLogin } = useproThemeContext()!
    const [api, contextHolder] = notification.useNotification()

    const location = useLocation()
    
    useEffect(()=>{
    if(location.pathname !== '/'){
        setIsHome(false)
    }else{
        setIsHome(true)
    }
  })
    const showLogin = () => {
        //如果没有登录就先登录，如果登录了就跳转个人中心
        setIsLogin(true)
        setModal2Open(true)
    }
    const register = () => {
        setIsLogin(false)
        setModal2Open(true)
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
                title="请先登录"
                centered
                destroyOnClose={true}
                open={modal2Open}
                footer={null}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                width={350}
            >
                <Signin></Signin>
            </Modal>
            <div className={styles.headertitle}>
                {/*如果没有登录则弹出登录界面*/}
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 1, marginLeft: '600px' }}>
                    <span onClick={showLogin}>我的</span>
                    <span>购物车</span>
                    <span onClick={register}>免费注册</span>
                    <span onClick={openNotificationWithIcon}>联系客服</span>
                </div>
            </div>
            {isHome ? ( <div className={styles.content}>
                <div>
                    <img src="src/assets/headerbg1.png" alt="" />
                    <span className={styles.bannertitle}>商业办公</span>
                    <span className={styles.bannerinfo}>价格真的实惠</span>
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
