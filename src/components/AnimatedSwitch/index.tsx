import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Routes } from 'react-router-dom'
import './AnimatedSwitch.less'

const AnimatedSwitch = (props :any) => {
  const { children } = props
  return (
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames={props.type || 'fade'} 
            timeout={props.duration || 300}
          >
            <Routes location={location}>{children}</Routes>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  )
}

export default AnimatedSwitch