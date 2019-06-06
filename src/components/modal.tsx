import * as React from 'react'
import { promiseAnimation } from '../utils'

interface IModalProps {
  title: string
  actions: (close: () => void) => React.ReactNode
  onClose: () => void
  noBackground?: boolean
  ignoreEsc?: boolean
  loading?: boolean
}

const backgroundAnimation: PropertyIndexedKeyframes = {
  opacity: [0, 1]
}

const modalAnimation: PropertyIndexedKeyframes = {
  transform: ['scale(0)', 'scale(1)'],
  opacity: [0, 1]
}

class Modal extends React.Component<IModalProps> {
  private readonly backgroundRef: React.RefObject<HTMLDivElement> = React.createRef()
  private readonly modalRef: React.RefObject<HTMLDivElement> = React.createRef()

  componentDidMount = () => {
    this.backgroundRef.current.animate(backgroundAnimation, { duration: 300, easing: 'ease' })
    this.modalRef.current.animate(modalAnimation, { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })
  }

  close = async () => {
    await Promise.all([
      promiseAnimation(
        this.backgroundRef.current.animate(backgroundAnimation, {
          duration: 300,
          easing: 'ease',
          direction: 'reverse',
          fill: 'forwards'
        })
      ),
      promiseAnimation(
        this.modalRef.current.animate(modalAnimation, {
          duration: 300,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
          direction: 'reverse',
          fill: 'forwards'
        })
      )
    ])

    this.props.onClose()
  }

  handleKey = (e: React.KeyboardEvent) => {
    console.debug(this)
  }

  render() {
    const { noBackground, onClose, title, actions } = this.props

    return (
      <div className='modal is-active'>
        {!noBackground && <div className='modal-background' onClick={this.close} ref={this.backgroundRef} />}
        <div className='modal-card' ref={this.modalRef}>
          <header className='modal-card-head'>
            <p className='modal-card-title has-text-centered'>{title}</p>
          </header>

          <section className='modal-card-body'>{this.props.children}</section>
          <footer className='modal-card-foot'>{actions(this.close)}</footer>
        </div>
      </div>
    )
  }
}

export default Modal
