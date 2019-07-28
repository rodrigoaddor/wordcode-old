import { PayloadedAction } from './common'
import { uuid } from '../utils'

//  Types  //

class Team {
  readonly id?: string

  constructor(public first: string = '', public second: string = '', storeId: boolean = true) {
    if (storeId) this.id = uuid('team')
  }

  get hasSomeData(): boolean {
    return this.first.length > 0 || this.second.length > 0
  }
  get hasData(): boolean {
    return this.first.length > 0 && this.second.length > 0
  }

  static toJson = (team: Team): string => {
    return JSON.stringify(new Team(team.first, team.second, false))
  }

  static fromJson = (team: string): Team => {
    const parsedTeam = JSON.parse(team)
    return new Team(parsedTeam['first'], parsedTeam['second'])
  }
}

// Actions //

enum TeamAction {
  SetTeams = 'SET_TEAMS'
}

type SetTeams = PayloadedAction<TeamAction.SetTeams, Team[]>
type TeamActions = SetTeams

//  State  //

interface TeamState {
  teams: Team[]
}

const defaultState: TeamState = {
  teams: []
}

const teamReducer = (state: TeamState = defaultState, action: TeamActions): TeamState => {
  switch (action.type) {
    case TeamAction.SetTeams:
      return { ...state, teams: action.payload }
    default:
      return state
  }
}

export { teamReducer, TeamAction, Team }
