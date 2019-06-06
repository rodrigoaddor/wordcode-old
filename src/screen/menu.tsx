import * as React from 'react'

import Screen from '../components/screen'
import './menu.sass'
import TeamsModal from '../components/teams'

interface IMenuScreenState {
  teamsModal: boolean
}

class MenuScreen extends React.Component<{}, IMenuScreenState> {
  state = {
    teamsModal: false
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
        {teamsModal && <TeamsModal onClose={() => this.setState({ teamsModal: false })} />}
      </>
    )
  }
}

export default MenuScreen
