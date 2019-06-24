import * as React from 'react'

import Screen from '../components/screen'

interface IGameProps {}

interface IGameState {}

class Game extends React.Component<IGameProps, IGameState> {
  render() {
    return <Screen className='has-background-info'><h1 className='is-title title-1'>Word</h1></Screen>
  }
}

export default Game