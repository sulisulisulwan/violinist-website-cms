import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config'
import { httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config

export const bioLongFormApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: AxiosRequestConfig
  ) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/bio'`)

  const result = await fetcher(`${BACKEND_API_BASE_URL}/bio/longForm`, data)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
])