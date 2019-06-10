import { createStore } from 'redux'
import { GameState, Action, GameActions } from './types'

const defaultState: GameState = {
  teams: []
}

export default createStore((state: GameState = defaultState, action: GameActions): GameState => {
  switch (action.type) {
    case Action.SetTeams:
      return { ...state, teams: action.payload }

    default:
      return state
  }
}, (window as any).__REDUX_DEVTOOLS_EXTENSION__!())
