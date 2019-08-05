import * as React from 'react'
import { connect } from 'react-redux'

import Screen from '../components/screen'
import Modal from '../components/modal'
import { Team } from '../store/team';
import { AppState } from '../store';

enum GameStatus {
  Loading,
  Ready,
  Playing,
  Results
}

interface IGameProps {
  teams: Team[]
}

interface IGameState {
  status: GameStatus
  teamIndex: number
  word: string
}

class Game extends React.Component<IGameProps, IGameState> {
  state = {
    status: GameStatus.Loading,
    teamIndex: 0,
    word: 'Test'
  }

  componentDidMount = () => {
    setTimeout(() => this.setState({ status: GameStatus.Ready }), 550)
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
          <span style={{ fontSize: 100 / word.length + 'vw' }} className='has-text-weight-bold has-text-white'>
            {word}
          </span>
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

export default connect((state: AppState) => ({
  teams: state.teams.teams
}))(Game)
