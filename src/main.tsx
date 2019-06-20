import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import gameStore from './store'
import Menu from './screen/menu'

import './main.sass'
import Screen from './components/screen'
import { Route, Router } from './components/router'
import { ScreenName, Transition } from './store/data'

const opacityTransition: Transition = {
  keyframes: {
    opacity: [0, 1]
  },
  options: {
    duration: 1000
  }
}

const slideTransition: Transition = {
  keyframes: [
    { transform: 'translateY(0)' }, 
    { transform: 'translateY(-100vh)' }
  ],
  options: {
    duration: 1500
  }
}

ReactDOM.render(
  <Provider store={gameStore}>
    <Router initialScreen={ScreenName.Menu}>
      <Route screen={ScreenName.Playing} inTransition={opacityTransition} outTransition={slideTransition}>
        <Screen><div style={{background: 'red'}}>Hello world</div></Screen>
      </Route>
      <Route screen={ScreenName.Menu} inTransition={opacityTransition} outTransition={slideTransition}>
        <Menu />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
