import * as React from 'react'
import { connect } from 'react-redux'

import Screen from '../../components/screen'
import Modal from '../../components/modal'
import { Team } from '../../store/team'
import { AppState } from '../../store'

import './game.sass'
import Words from '../../words'

enum GameStatus {
  Loading,
  Ready,
  Playing,
  Results
}

interface IGameProps {
  teams: Team[]
  words: Words[]
}

interface IGameState {
  status: GameStatus
  teamIndex: number
  word: string
}

class Game extends React.Component<IGameProps, IGameState> {
  private words: string[] = []
  private points: number[] = []

  state = {
    status: GameStatus.Loading,
    teamIndex: 0,
    word: 'Test'
  }

  constructor(props: IGameProps) {
    super(props)
    ;(async () => {
      console.log(this.props.words)
      const r: (string[] | false)[] = await Promise.all(this.props.words.map(wordPack => wordPack.fetchWords()))
      if (r.every(words => words)) {
        this.words = r.flat()
        console.log(this.words)
      }
    })()
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ status: GameStatus.Ready }), 550)
  }

  doWord = () => {
    this.setState({
      word: this.words.splice(Math.floor(Math.random() * this.words.length))[0]
    })
  }

  rightWord = () => {
    this.points[this.state.teamIndex]++
    this.doWord()
  }

  render() {
    const { teams } = this.props
    const { status, teamIndex, word } = this.state
    const team = teams[teamIndex]

    const readyActions = (close: () => void) => (
      <div className='is-flex' style={{ justifyContent: 'center', flexGrow: 1 }}>
        <a className='button is-inline-block' onClick={close}>
          Ready
        </a>
      </div>
    )

    return (
      <Screen className='has-background-info'>
        {status === GameStatus.Playing && (
          <>
            <span style={{ fontSize: 100 / word.length + 'vw' }} className='has-text-weight-bold has-text-white'>
              {word}
            </span>
            <div className='mobile-left' />
            <div className='mobile-right' />
          </>
        )}

        {status === GameStatus.Ready && (
          <Modal
            title='Now Playing'
            actions={readyActions}
            onClose={() => this.setState({ status: GameStatus.Playing })}
          >
            <div className='has-text-centered has-text-weight-semibold is-size-1'>
              {`${team.first} & ${team.second}`}
            </div>
          </Modal>
        )}
      </Screen>
    )
  }
}

export default connect(({ teams, words }: AppState) => ({
  teams: teams.teams,
  words: Object.values(words).filter(words => words.enabled)
}))(Game)
