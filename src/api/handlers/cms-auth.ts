import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { httpMethods } from 'suli-violin-website-types/src'

export const cmsAuthApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: any
  ) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/cms-auth'`)

  const result = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/cms-auth${query ? query : ''}`, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['POST', axios.post ],
  ['GET', axios.get ],
])