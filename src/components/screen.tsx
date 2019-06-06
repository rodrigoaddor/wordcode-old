import * as React from 'react'
import './screen.sass'

class Screen extends React.PureComponent {
  render() {
    return <div className='screen'>
      {this.props.children}
    </div>
  }
}

export default Screen