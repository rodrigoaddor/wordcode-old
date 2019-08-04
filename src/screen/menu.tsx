import * as React from 'react'
import { connect } from 'react-redux'

import Screen from '../components/screen'
import './menu.sass'
import TeamsModal from '../components/teams'
import { RouterContext, ScreenName } from '../components/router'
import { Team, TeamAction } from '../store/team'
import { Pos, TransitionAction } from '../store/transition'
import { AppState } from '../store'

const shakeKeyframes: PropertyIndexedKeyframes = {
  transform: [-1, 2, -4, 4, -4, 4, -4, 2, -1].map(i => `translateX(${i}px)`)
}

interface IMenuScreenProps {
  setTeams: (teams: Team[]) => void
  setTransitionPos: (coords: Pos) => void
  initialTeams?: Team[]
}

interface IMenuScreenState {
  teamsModal: boolean
}

class MenuScreen extends React.Component<IMenuScreenProps, IMenuScreenState> {
  private readonly teamsRef: React.RefObject<HTMLAnchorElement> = React.createRef()

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

    const onStart = (e: React.MouseEvent<HTMLAnchorElement>, routerContext: RouterContext) => {
      if (!this.props.initialTeams || this.props.initialTeams.length === 0) {
        this.teamsRef.current!.animate(shakeKeyframes, {
          duration: 1000,
          easing: 'cubic-bezier(.36,.07,.19,.97)'
        })
        return
      }

      this.props.setTransitionPos({ x: e.pageX, y: e.pageY })
      routerContext.go(ScreenName.Playing)
    }

    return (
      <>
        <Screen>
          <h1 className='is-title menu-title'>WordCode</h1>

          <RouterContext.Consumer>
            {(routerContext: RouterContext) => (
              <div className='buttons has-addons'>
                <a className='button is-rounded' onClick={() => routerContext.go(ScreenName.Words)}>
                  Words
                </a>
                <a className='button is-large is-info' onClick={e => onStart(e, routerContext)}>
                  Start
                </a>
                <a
                  className='button is-rounded'
                  ref={this.teamsRef}
                  onClick={() => this.setState({ teamsModal: true })}
                >
                  Teams
                </a>
              </div>
            )}
          </RouterContext.Consumer>
        </Screen>
        {teamsModal && <TeamsModal defaultTeams={this.props.initialTeams} onClose={this.onTeamsChange} />}
      </>
    )
  }
}

export default connect(
  (state: AppState) => ({
    initialTeams: state.teams.teams
  }),
  dispatch => ({
    setTeams: (teams: Team[]) =>
      dispatch({
        type: TeamAction.SetTeams,
        payload: teams
      }),
    setTransitionPos: (coords: Pos) =>
      dispatch({
        type: TransitionAction.SetTransitionPos,
        payload: coords
      })
  })
)(MenuScreen)
