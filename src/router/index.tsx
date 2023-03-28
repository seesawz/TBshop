import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { createRef } from 'react'
import './AnimatedSwitch.less'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Shopinfo from '@/pages/Shopinfo'
import Detail from '@/pages/Detail'
import { Container } from 'react-bootstrap'
import { ConfigProvider } from 'antd';
import AutoScorllTop from './Top/Top'
import Cart from '@/pages/cart'
import {
  createBrowserRouter,
  useLocation,
  useOutlet,
} from 'react-router-dom'
import UserCenter from '@/pages/userCenter'
import Pay from '@/pages/Pay'
import SearchList from '@/pages/SearchList/index'
import Login from '@/pages/login/index'

const routes = [
  { path: '/', name: 'Home', element: <Shopinfo />, nodeRef: createRef() },
  { path: '/login', name: 'login', element: <Login/>, nodeRef: createRef() },
  { path: '/detail', name: 'detail', element: <Detail />, nodeRef: createRef() },
  { path: '/userCenter', name: 'usercenter', element: <UserCenter/>, nodeRef: createRef() },
  { path: '/cart', name: 'cart', element: <Cart/>, nodeRef: createRef() },
  { path: '/pay', name: 'pay', element: <Pay/>, nodeRef: createRef() },
  { path: '/search', name: 'search', element: <SearchList/>, nodeRef: createRef() },
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
  const location = useLocation()

 

  const currentOutlet = useOutlet()
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {}
  return (
    <div>
   <ConfigProvider>
      <Header></Header>
      <AutoScorllTop>
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
      </AutoScorllTop>
      <Footer></Footer>
      </ ConfigProvider>  
    </div>
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
