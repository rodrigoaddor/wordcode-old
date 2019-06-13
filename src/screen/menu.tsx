import * as React from 'react'
import { connect } from 'react-redux'
import { Action, GameState } from '../store/types'

import Screen from '../components/screen'
import './menu.sass'
import TeamsModal from '../components/teams'
import { Team } from '../store/data'

interface IMenuScreenProps {
  setTeams?: (teams: Team[]) => void
  defaultTeams?: Team[]
}

interface IMenuScreenState {
  teamsModal: boolean
}

class MenuScreen extends React.Component<IMenuScreenProps, IMenuScreenState> {
  state = {
    teamsModal: false
  }

  onTeamsChange = (teams: Team[]) => {
    this.props.setTeams(teams)
    this.setState({
      teamsModal: false
    })
  }

  render() {
    const { teamsModal } = this.state

    const generateActions = (close: () => void) => (
      <>
        <a className='button' onClick={close}>
          Close
        </a>
      </>
    )

    return (
      <>
        <Screen>
          <h1 className='is-title title'>WordCode</h1>

          <div className='buttons has-addons'>
            <a className='button is-rounded'>Words</a>
            <a className='button is-large is-info'>Start</a>
            <a className='button is-rounded' onClick={() => this.setState({ teamsModal: true })}>
              Teams
            </a>
          </div>
        </Screen>
        {teamsModal && <TeamsModal defaultTeams={this.props.defaultTeams} onClose={this.onTeamsChange} />}
      </>
    )
  }
}

export default connect(
  (state: GameState) => ({
    defaultTeams: state.teams
  }),
  dispatch => ({
    setTeams: (teams: Team[]) =>
      dispatch({
        type: Action.SetTeams,
        payload: teams
      })
  })
)(MenuScreen)
