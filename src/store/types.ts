import { Team } from './data'

type Coordinates = { x: number, y: number }

interface GameState {
  teams: Team[]
  transitionPos?: Coordinates
}

enum Action {
  SetTeams,
  SetTransitionPos
}

// Boilerplate for actions that have a single payload
interface PayloadedAction<Type, Payload> {
  type: Type
  payload: Payload
}

interface TeamAction extends PayloadedAction<Action.SetTeams, Team[]> {}
interface TransitionPosAction extends PayloadedAction<Action.SetTransitionPos, Coordinates> {}

// Sum of all Actions
type GameActions = TeamAction | TransitionPosAction

export { Action, Coordinates, GameActions, GameState }
