import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import gameStore from './store'
import Menu from './screen/menu'
import Game from './screen/game'

import './main.sass'
import { Route, Router } from './components/router'
import { ScreenName, Team } from './store/data'
import { appear, ripple } from './transitions'
import store from './store'
import { GameState, Action } from './store/types'

const savedTeams = localStorage.getItem('teams')
if (savedTeams) {
  store.dispatch({
    type: Action.SetTeams,
    payload: JSON.parse(savedTeams).map(team => Team.fromJson(team))
  })
}

store.subscribe(() => {
  const state: GameState = store.getState()
  localStorage.setItem('teams', JSON.stringify(state.teams.map(team => Team.toJson(team))))
})

ReactDOM.render(
  <Provider store={gameStore}>
    <Router initialScreen={ScreenName.Menu}>
      <Route screen={ScreenName.Menu} inTransition={appear}>
        <Menu />
      </Route>
      <Route screen={ScreenName.Playing} inTransition={ripple}>
        <Game />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
