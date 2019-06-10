import { Team } from './data'

interface GameState {
  teams: Team[]
}

enum Action {
  SetTeams
}

// Boilerplate for actions that have a single payload
interface PayloadedAction<Type, Payload> {
  type: Type
  payload: Payload
}

interface TeamAction extends PayloadedAction<Action.SetTeams, Team[]> {}

// Sum of all Actions
type GameActions = TeamAction

export { GameState, Action, GameActions }
