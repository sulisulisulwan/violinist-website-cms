import * as React from 'react'
import Cms from './Cms'
import LoginPage from './ui/views/login/LoginPage'
import useUserLogin from './hooks/useUserLogin'
import { useConfig } from './hooks'

const App = () => {

  const configInstance = useConfig()

  const { isLoggedIn, onSubmitHandler } = useUserLogin(configInstance)
  return (
    // isLoggedIn ? 
    <Cms config={configInstance}/>
    //  : <LoginPage config={configInstance} onSubmitHandler={onSubmitHandler}/>
    )
 
}


export default App