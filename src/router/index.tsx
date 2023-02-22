import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import { createRef } from 'react'
import './AnimatedSwitch.less'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Shopinfo from '@/pages/Shopinfo'
import Detail from '@/pages/Detail'
import styles from './index.module.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import {
  createBrowserRouter,
  RouterProvider,
  NavLink,
  useLocation,
  useOutlet,
} from 'react-router-dom'

const routes = [
  { path: '/', name: 'Home', element: <Shopinfo />, nodeRef: createRef() },
  { path: '/detail', name: 'detail', element: <Detail />, nodeRef: createRef() },
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
    <>
      <Header></Header>
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
