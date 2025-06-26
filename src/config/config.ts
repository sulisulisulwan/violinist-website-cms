class Config {

  protected config: any
  protected keys: string[]
  protected configPaths: { pathToEnv: string, pathToConfigDir: string }
  protected _isLoaded: boolean

  constructor(keys: string[]) {

    this.keys = keys
    this.config = null 
    this._isLoaded = false
  }

  get isLoaded () {
    return this._isLoaded
  }

  public getField(field: string | string[]) {
    if (!Array.isArray(field)) {
      return this.config[field]
    }

    let level = this.config
    for (let i = 0; i < field.length; i++) {
      level = level[field[i]]
    }

    return level
  }

  public async initConfig() {

    const configJson = await fetch('/config.json')
    // const configJson = await fetch('/alt.config.json')
    const json = await configJson.json()
    const config: any = {}

    this.keys.forEach(key => {
      config[key] = json[key]
    })

    this.config = config
    this._isLoaded = true
    return this
  }

}

const config = new Config([
  "BACKEND_API_BASE_URL"
])

export default config

export { Config }