import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config'
import { BiographyItemAPI, httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config

export const bioApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: BiographyItemAPI
  ) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/bio'`)

  const result = await fetcher(`${BACKEND_API_BASE_URL}/bio${query ? query : ''}`, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.post ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])