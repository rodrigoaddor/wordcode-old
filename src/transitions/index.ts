import { TransitionInfo, Transition, TransitionType } from '../components/router'
import { store } from '../store'

const appear: Transition = {
  keyframes: [{ opacity: 0, transform: 'scale(0.75)' }, { opacity: 1, transform: 'scale(1)' }],
  options: {
    duration: 500,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)'
  }
}

const ripple = (transitionInfo: TransitionInfo): Transition => {
  const { x, y } = store.getState().transition.pos!

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

const slide = (transitionInfo: TransitionInfo): Transition => {
  const keyframes: Keyframe[] = [{ transform: 'translateX(-100vw)' }, { transform: 'translateX(0)' }]
  const normal = transitionInfo.type === TransitionType.IN

  return {
    keyframes: normal ? keyframes : keyframes.reverse(),
    options: {
      duration: 400,
      easing: normal ? 'cubic-bezier(0.075, 0.82, 0.165, 1)' : 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      fill: 'forwards'
    },
    className: 'slide'
  }
}

export { appear, ripple, slide }
