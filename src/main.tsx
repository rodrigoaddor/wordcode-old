import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import gameStore from './store'
import Menu from './screen/menu'

import './main.sass'

ReactDOM.render(
  <Provider store={gameStore}>
    <Menu />
  </Provider>,
  document.getElementById('app')
)
