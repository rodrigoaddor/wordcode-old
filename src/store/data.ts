import { uuid } from '../utils'

class Team {
  public id?: string

  constructor(public first: string = '', public second: string = '') {
    this.id = uuid('team')
  }

  get hasSomeData(): boolean {
    return this.first.length > 0 || this.second.length > 0
  }
  get hasData(): boolean {
    return this.first.length > 0 && this.second.length > 0
  }
}

export { Team }
