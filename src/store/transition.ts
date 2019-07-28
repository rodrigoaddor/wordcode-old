import { PayloadedAction } from './common'

//  Types  //
type Pos = { x: number; y: number }

//  Actions  //

enum TransitionAction {
  SetTransitionPos = 'SET_TRANSITION_POS'
}

type SetTransitionPos = PayloadedAction<TransitionAction.SetTransitionPos, Pos>
type TransitionActions = SetTransitionPos

//  State  //

interface TransitionState {
  pos?: Pos
}

const transitionReducer = (state: TransitionState = {}, action: TransitionActions): TransitionState => {
  switch (action.type) {
    case TransitionAction.SetTransitionPos:
      return { ...state, pos: action.payload }
    default:
      return state
  }
}

export { transitionReducer, TransitionAction, Pos }
