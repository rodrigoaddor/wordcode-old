import { Transition } from '../store/data'
import { TransitionInfo } from '../components/router'
import store from '../store'

const appear: Transition = {
  keyframes: [{ opacity: 0, transform: 'scale(0.75)' }, { opacity: 1, transform: 'scale(1)' }],
  options: {
    duration: 500,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
  }
}

const ripple = (transitionInfo: TransitionInfo): Transition => {
  const { x, y } = store.getState().transitionPos
  console.log(x, y)

  const px = x + 'px'
  const py = y + 'px'
  const size = Math.sqrt(Math.max(x, window.innerWidth - x) ** 2 + Math.max(y, window.innerHeight) ** 2) * 2 + 'px'

  return {
    keyframes: [{ top: py, left: px, width: 0, height: 0 }, { top: py, left: px, width: size, height: size }],
    options: {
      duration: 500,
      easing: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      fill: 'none'
    },
    className: 'ripple has-background-info'
  }
}

export { appear, ripple }
