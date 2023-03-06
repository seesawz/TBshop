import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import { createRef } from 'react'
import './AnimatedSwitch.less'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Shopinfo from '@/pages/Shopinfo'
import Detail from '@/pages/Detail'
import { Container } from 'react-bootstrap'
import { message } from 'antd';
import { ConfigProvider } from 'antd';
import type { NoticeType } from "antd/es/message/interface";
import Cart from '@/pages/cart'
import {
  createBrowserRouter,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import UserCenter from '@/pages/userCenter'

const routes = [
  { path: '/', name: 'Home', element: <Shopinfo />, nodeRef: createRef() },
  { path: '/detail', name: 'detail', element: <Detail />, nodeRef: createRef() },
  { path: '/userCenter', name: 'usercenter', element: <UserCenter/>, nodeRef: createRef() },
  { path: '/cart', name: 'cart', element: <Cart/>, nodeRef: createRef() },
]
/*  const MyRouter = () => (
    <div style={{ backgroundColor: '#dededd' }} className={styles.bg}>
        <Header></Header>
        <Router

        >
            <Routes>
                <Route path={'/'} element={<Shopinfo />}></Route>
                <Route path={'/detail'} element={<Detail />}></Route>
            </Routes>
        </Router>
        <Footer></Footer>
    </div>
) */

function Example() {
  const [messageApi, contextHolder] = message.useMessage()
  const info = (type:NoticeType,msg:string) => {
    messageApi.open({
      type,
      content:msg
    })
  }
  const location = useLocation()
  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <>
    {contextHolder}
   <ConfigProvider>
      <Header info={info}></Header>
      <Container >
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            nodeRef={nodeRef}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            {(state) => (
              <div ref={nodeRef} className='page'>
                {currentOutlet}
              </div>
            )}
          </CSSTransition>
        </SwitchTransition>
      </Container>
      <Footer></Footer>
      </ ConfigProvider>  
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Example />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
])

export default router 
