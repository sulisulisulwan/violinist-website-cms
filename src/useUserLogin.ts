import { useState } from "react"
import { cmsAuthApiHandler } from "./api/handlers/cms-auth"

const useUserLogin = () => {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()
    
    const username = e.target[0].value
    const password = e.target[1].value

    const data = {
      username,
      password
    }

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