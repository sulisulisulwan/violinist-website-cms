import { useState } from "react"
import { cmsAuthApiHandler } from "../api/handlers/cms-auth"
import { Config } from "../config/config"

const useUserLogin = (config: Config) => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()
    
    const username = e.target[0].value
    const password = e.target[1].value

    const data = {
      username,
      password
    }

    if (!config) return

    const result = await cmsAuthApiHandler('POST', '', data)
    
    const isAuthorized = result.data.result === 'authorized'

    if (isAuthorized) {
      setIsLoggedIn(true)
    } else {
      const loginMessageComponent = document.getElementById('login-message')
      loginMessageComponent.innerHTML = 'Username or password invalid'
    }
    
  }

  return { isLoggedIn, onSubmitHandler }
}

export default useUserLogin