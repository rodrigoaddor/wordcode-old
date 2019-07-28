import * as React from 'react'
import './style.sass'

class Screen extends React.PureComponent<React.HTMLAttributes<HTMLDivElement>> {
  render() {
    return <div {...this.props} className={['screen', this.props.className].join(' ')}>
      {this.props.children}
    </div>
  }
}

export default Screen