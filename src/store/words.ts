import { PayloadedAction } from './common'
import { Words } from '../words'
import { uuid } from '../utils'

//  Actions  //

enum WordsAction {
  LoadWords = 'LOAD_WORDS',
  EnableWords = 'ENABLE_WORDS',
  DisableWords = 'DISABLE_WORDS'
}

type LoadWords = PayloadedAction<WordsAction.LoadWords, Words[]>
type EnableWords = PayloadedAction<WordsAction.EnableWords, string>
type DisableWords = PayloadedAction<WordsAction.DisableWords, string>
type WordsActions = LoadWords | EnableWords | DisableWords

//  State  //

type WordsState = { [key: string]: Words }

const defaultState: WordsState = {}

const wordsReducer = (state: WordsState = defaultState, action: WordsActions): WordsState => {
  switch (action.type) {
    case WordsAction.LoadWords:
      return action.payload.reduce((obj, item) => ({ ...obj, [uuid('words')]: item }), {})
    case WordsAction.EnableWords:
      return { ...state, [action.payload]: { ...state[action.payload], enabled: true } }
    case WordsAction.DisableWords:
      return { ...state, [action.payload]: { ...state[action.payload], enabled: false } }
    default:
      return state
  }
}

export { wordsReducer, WordsAction }
