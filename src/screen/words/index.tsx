import * as React from 'react'

import Screen from '../../components/screen'
import { RouterContext, ScreenName } from '../../components/router'
import Words from '../../words'
import classNames from 'classnames'

import './words.sass'
import { store, AppState } from '../../store'
import { WordsAction } from '../../store/words'
import { connect } from 'react-redux'

interface IWordBoxProps {
  words: Words
  selected: boolean
  id: string
  enable: (id: string) => void
  disable: (id: string) => void
}

class _WordBox extends React.PureComponent<IWordBoxProps> {
  toggleSelected = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id, selected, enable, disable } = this.props
    if (selected) disable(id)
    else enable(id)
  }

  render = () => {
    const { words } = this.props

    return (
      <>
        <article
          className={classNames('notification word-box', words.enabled && 'has-background-info')}
          onClick={this.toggleSelected}
        >
          <span className={classNames('tag is-medium', !words.enabled && 'is-dark')}>{words.amount} words</span>
          <p className={classNames('title', words.enabled && 'has-text-white')}>{words.name}</p>
        </article>
      </>
    )
  }
}

const WordBox = connect(
  null,
  dispatch => ({
    enable: (id: string) =>
      dispatch({
        type: WordsAction.EnableWords,
        payload: id
      }),
    disable: (id: string) =>
      dispatch({
        type: WordsAction.DisableWords,
        payload: id
      })
  })
)(_WordBox)

interface IWordsScreenProps {
  words: { [key: string]: Words }
}

class WordsScreen extends React.Component<IWordsScreenProps> {
  componentDidMount = async () => {
    if (Object.values(store.getState().words).length === 0) {
      const r = await Promise.all([
        fetch('/words/index.json').then(r => r.json()),
        new Promise(res => setTimeout(res, 1000))
      ])

      store.dispatch({
        type: WordsAction.LoadWords,
        payload: r[0]
      })
    }
  }

  render = () => {
    return (
      <RouterContext.Consumer>
        {(routerContext: RouterContext) => (
          <Screen className='has-background-grey-lighter'>
            <div
              className={classNames(
                'pageloader has-background-info',
                Object.values(this.props.words).length === 0 && 'is-active'
              )}
            >
              <span className='title'>Loading Words...</span>
            </div>
            <div className='word-container'>
              {Object.entries(this.props.words).map((entry: [string, Words]) => {
                return <WordBox key={entry[0]} words={entry[1]} selected={entry[1].enabled} id={entry[0]} />
              })}
            </div>
            <div className='back-container has-background-dark'>
              <a className='button is-medium back-button' onClick={() => routerContext.go(ScreenName.Menu)}>
                Go Back
              </a>
            </div>
          </Screen>
        )}
      </RouterContext.Consumer>
    )
  }
}

export default connect(
  ({ words }: AppState) => ({
    words
  }),
  dispatch => ({
    enable: (id: string) =>
      dispatch({
        type: WordsAction.EnableWords,
        payload: id
      }),
    disable: (id: string) =>
      dispatch({
        type: WordsAction.DisableWords,
        payload: id
      })
  })
)(WordsScreen)
