import { uuid } from '../utils'

enum ScreenName {
  Menu,
  Waiting,
  Playing,
  Scores
}

class Team {
  public id?: string

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

interface Transition {
  keyframes: Keyframe[] | PropertyIndexedKeyframes
  options: KeyframeAnimationOptions
  className?: string
}

enum TransitionType {
  IN,
  OUT
}

export { ScreenName, Team, Transition, TransitionType }
