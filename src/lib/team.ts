import { uuid } from '../utils';

export default class Team {
  public first: string
  public second: string
  public id: string

  constructor(first: string = '', second: string = '') {
    this.first = first
    this.second = second
    this.id = uuid('team')
  }
  
  get hasSomeData(): boolean {
    return this.first.length > 0 || this.second.length > 0
  }
  get hasData(): boolean {
    return this.first.length > 0 && this.second.length > 0
  }
}