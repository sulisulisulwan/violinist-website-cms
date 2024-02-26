import * as React from 'react'
import Cms from './Cms'
import LoginPage from './ui/views/login/LoginPage'
import useUserLogin from './useUserLogin'

const App = () => {

  const { isLoggedIn, onSubmitHandler } = useUserLogin()
  return (isLoggedIn ? <Cms/> : <LoginPage onSubmitHandler={onSubmitHandler}/>)
 
}


export default App