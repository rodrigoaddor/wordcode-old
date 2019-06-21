import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import gameStore from './store'
import Menu from './screen/menu'
import Game from './screen/game';

import './main.sass'
import { Route, Router } from './components/router'
import { ScreenName } from './store/data'
import { appear } from './transitions'

ReactDOM.render(
  <Provider store={gameStore}>
    <Router initialScreen={ScreenName.Menu}>
      <Route screen={ScreenName.Menu} inTransition={appear}>
        <Menu />
      </Route>
      <Route screen={ScreenName.Playing} inTransition={appear}>
        <Game />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
