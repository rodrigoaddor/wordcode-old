export default class Words {
  public words: string[]

  constructor(public file: string, public name?: string, public amount?: number, public enabled: boolean = false) {
    console.log(this)
  }

  async fetchWords(): Promise<string[] | false> {
    const response = await fetch(`/words/${this.file}`)
    if (response.ok && response.status === 200) {
      this.words = (await response.text()).split(',')
      this.amount = this.amount || this.words.length
      return this.words
    } else {
      return false
    }
  }

  static fromJSON(json: { [key: string]: any }): Words {
    console.log('from json')
    return new Words(json['file'], json['name'], json['amount'], json['enabled'])
  }
}

const getModules = async (): Promise<Words[]> => {
  const response = await fetch('/words/index.json')
  if (response.ok && response.status === 200) {
    const modules = await response.json()
    console.log('a')
    return Object.keys(modules).map(module => Words.fromJSON(modules[module]))
  } else {
    throw Error(`Error querying words: ${response.statusText}`)
  }
}
//;(window as any).Words = Words