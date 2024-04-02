import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { httpMethods } from 'suli-violin-website-types/src'

export const bioLongFormApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: AxiosRequestConfig
  ) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/bio'`)

  const result = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/bio/longForm`, data)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
])