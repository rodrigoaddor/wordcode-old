import * as React from 'react'
import classNames from 'classnames'

import { ScreenName, Transition, TransitionType } from '../store/data'
import { promiseAnimation } from '../utils'

// Transition or Transition generator, with the other screen as argument
// (previousScreen if inTransition, or currentScreen if outTransition)
type DynamicTransition = Transition | ((transitionInfo: TransitionInfo) => Transition)

interface RouterData {
  currentScreen: ScreenName
  previousScreen?: ScreenName
}

interface TransitionInfo extends RouterData {
  type: TransitionType
}

interface RouterContext extends RouterData {
  go: (screen: ScreenName) => void
}

const RouterContext = React.createContext<RouterContext>({
  go: () => console.error("Router setScreen called before it's built"),
  currentScreen: ScreenName.Menu
})

interface IRouterProps {
  initialScreen: ScreenName
}

interface IRouterState {
  currentScreen: ScreenName
  previousScreen?: ScreenName
}

class Router extends React.Component<IRouterProps, IRouterState> {
  private readonly children: React.ReactNode[] = []
  private readonly childrenRefs: Map<ScreenName, React.RefObject<Route>>

  // Checks if a DynamicTransition is an actual Transition or an Transition generator
  static isTransition = (transition: DynamicTransition): transition is Transition => typeof transition !== 'function'

  get routerData(): RouterData {
    const { currentScreen, previousScreen } = this.state
    return {
      currentScreen,
      previousScreen
    }
  }

  get routerContext(): RouterContext {
    return {
      ...this.routerData,
      go: this.go
    }
  }

  constructor(props) {
    super(props)

    this.childrenRefs = new Map()
    React.Children.forEach(this.props.children, child => {
      if (React.isValidElement(child) && child.type == Route) {
        if (this.childrenRefs.has(child.props.screen))
          throw new Error('Router children must be routes with different ScreenName')

        const ref = React.createRef<Route>()

        this.children.push(React.cloneElement(child, { ref, key: child.props.screen }))
        this.childrenRefs.set(child.props.screen, ref)
      }
    })

    this.state = {
      currentScreen: this.props.initialScreen
    }
  }

  componentDidUpdate = async () => {
    if (this.state.previousScreen === undefined) return

    const prevRoute = this.childrenRefs.get(this.state.previousScreen).current
    const newRoute = this.childrenRefs.get(this.state.currentScreen).current

    const dynPrevOut = prevRoute.props.outTransition
    const dynNewIn = newRoute.props.inTransition

    const prevOut: Transition = Router.isTransition(dynPrevOut)
      ? dynPrevOut
      : dynPrevOut({ ...this.routerData, type: TransitionType.OUT })

    const newIn: Transition = Router.isTransition(dynNewIn)
      ? dynNewIn
      : dynNewIn({ ...this.routerData, type: TransitionType.IN })

    const promises = []

    if (prevOut) {
      promises.push(prevRoute.animate(prevOut))
    }

    if (newIn) {
      promises.push(
        newRoute.animate({
          keyframes: newIn.keyframes,
          options: {
            delay: prevOut && Number(prevOut.options.duration.toString()),
            ...newIn.options
          },
          className: newIn.className
        })
      )
    }

    await Promise.all(promises)
    this.setState({ previousScreen: undefined })
  }

  go = (screen: ScreenName) =>
    this.setState((prevState: IRouterState) => ({
      currentScreen: screen,
      previousScreen: prevState.currentScreen
    }))

  render() {
    return <RouterContext.Provider value={this.routerContext}>{this.children}</RouterContext.Provider>
  }
}

interface IRouteProps {
  screen: ScreenName
  inTransition?: DynamicTransition
  outTransition?: DynamicTransition
  ref?: React.RefObject<Route>
}

class Route extends React.Component<IRouteProps> {
  private readonly elRef: React.RefObject<HTMLDivElement> = React.createRef()

  animate = (transition: Transition): Promise<void> => {
    const { current: el } = this.elRef
    const oldClassName = el.className
    el.className = classNames(el.classList, transition.className)

    const anim = promiseAnimation(
      this.elRef.current.animate(transition.keyframes, { fill: 'both', ...transition.options })
    )

    anim.then(() => {
      el.className = oldClassName
    })

    return anim
  }

  render = () => {
    const divStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh'
    }

    return (
      <RouterContext.Consumer>
        {routeData =>
          (routeData.currentScreen === this.props.screen || routeData.previousScreen == this.props.screen) && (
            <div ref={this.elRef} style={divStyle}>
              {this.props.children}
            </div>
          )
        }
      </RouterContext.Consumer>
    )
  }
}

export { Router, Route, RouterData, RouterContext, TransitionInfo }
