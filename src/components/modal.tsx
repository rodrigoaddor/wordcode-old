import * as React from 'react'
import { promiseAnimation } from '../utils'

interface IModalProps {
  title: string
  actions: (close: () => void) => React.ReactNode
  onClose: () => void
  shouldClose: () => boolean
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

  handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.close()
  }

  componentDidMount = () => {
    this.backgroundRef.current.animate(backgroundAnimation, { duration: 300, easing: 'ease' })
    this.modalRef.current.animate(modalAnimation, { duration: 300, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' })

    if (!this.props.ignoreEsc) window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount = () => {
    if (!this.props.ignoreEsc) window.removeEventListener('keydown', this.handleKey)
  }

  close = async () => {
    if (this.props.shouldClose && !this.props.shouldClose()) return

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

  render() {
    const { noBackground, onClose, title, actions, ignoreEsc } = this.props

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
