import { useEffect, useState } from 'react'
import configInstance from '../config/config'

const useConfig = () => {
  const [ configuration, setConfiguration ] = useState(null)
  useEffect(() => {
    const initiateConfiguration = async () => {
      const initializedConfig = await configInstance.initConfig()
      setConfiguration(initializedConfig)
    }
    initiateConfiguration()
  }, [])

  return configuration

}

export default useConfig