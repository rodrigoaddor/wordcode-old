import * as React from 'react'
import { Transition } from './store/data'

const appear: Transition = {
  keyframes: [{ opacity: 0, transform: 'scale(0.75)' }, { opacity: 1, transform: 'scale(1)' }],
  options: {
    duration: 500,
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',

  },
  zIndex: 5
}

export { appear }
