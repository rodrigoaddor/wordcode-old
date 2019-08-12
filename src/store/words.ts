import { PayloadedAction } from './common'
import Words from '../words'
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
  let words: Words
  switch (action.type) {
    case WordsAction.LoadWords:
      return action.payload.reduce((obj, item) => ({ ...obj, [uuid('words')]: item }), {})
    case WordsAction.EnableWords:
      words = state[action.payload]
      words.enabled = true
      return { ...state, [action.payload]: words }
    case WordsAction.DisableWords:
      words = state[action.payload]
      words.enabled = false
      return { ...state, [action.payload]: words }
    default:
      return state
  }
}

export { wordsReducer, WordsAction }
