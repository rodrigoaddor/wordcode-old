import * as React from 'react'
import Modal from './modal'
import Team from '../lib/team'
import { promiseAnimation } from '../utils'

const nameRegex = new RegExp('^(\\d+)-((?:first)|(?:second))$')

const teamAnimation: PropertyIndexedKeyframes = {
  transform: ['scaleY(0)', 'scaleY(1)'],
  maxHeight: ['0', '2.25em']
}

interface ITeamsModalProps {
  onClose: () => void
  teams?: Team[]
}

interface ITeamsModalState {
  teams: Team[]
}

class TeamsModal extends React.Component<ITeamsModalProps, ITeamsModalState> {
  private readonly inputRefs: React.RefObject<HTMLDivElement>[]

  constructor(props) {
    super(props)

    this.state = {
      teams: props.teams || []
    }

    this.inputRefs = props.teams ? Array(props.teams.length).fill(React.createRef()) : []
  }

  componentDidUpdate = (_, prevState: ITeamsModalState) => {
    if (prevState.teams.length < this.state.teams.length) {
      const el = this.inputRefs[this.inputRefs.length - 1].current

      el.animate(teamAnimation, {
        duration: 200,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      })
    }
  }

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const value = target.value
    const [, teamIndex, player] = target.name.match(nameRegex)

    this.setState(prevState => ({
      teams: prevState.teams.map((team, i) => {
        if (i === parseInt(teamIndex)) team[player] = value
        return team
      })
    }))
  }

  autoRemove = async (e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target
    const index = parseInt(target.name.match(nameRegex)[1])

    await new Promise(res => setTimeout(res, 0))

    const focused = Array.from(target.parentElement.parentElement.querySelectorAll('input')).some(
      el => el == document.activeElement
    )

    if (index !== this.state.teams.length - 1 && !focused && !this.state.teams[index].hasSomeData) {
      await promiseAnimation(
        this.inputRefs[index].current.animate(teamAnimation, {
          duration: 200,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          direction: 'reverse',
          fill: 'forwards'
        })
      )

      this.inputRefs.splice(index, 1)

      this.setState(prevState => ({
        teams: prevState.teams.filter((_, i) => i !== index)
      }))
    }
  }

  render() {
    const { onClose } = this.props
    const { teams } = this.state

    const generateActions = (close: () => void) => (
      <>
        <a className='button' onClick={close}>
          Close
        </a>
      </>
    )

    if (teams.length === 0 || teams[teams.length - 1].hasData) {
      teams.push(new Team())
      this.inputRefs.push(React.createRef())
    }

    return (
      <Modal title='Teams' actions={generateActions} onClose={onClose}>
        {teams.map((team: Team, index) => (
          <div className='field has-addons' key={team.id} ref={this.inputRefs[index]}>
            <p className='control is-expanded'>
              <input
                className='input'
                type='text'
                name={`${index}-first`}
                defaultValue={team.first}
                onChange={this.handleInput}
                onBlur={this.autoRemove}
              />
            </p>
            <p className='control'>
              <a className='button is-static'>and</a>
            </p>
            <p className='control is-expanded'>
              <input
                className='input'
                type='text'
                name={`${index}-second`}
                defaultValue={team.second}
                onChange={this.handleInput}
                onBlur={this.autoRemove}
              />
            </p>
          </div>
        ))}
      </Modal>
    )
  }
}

export default TeamsModal
