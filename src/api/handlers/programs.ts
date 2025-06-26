import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { httpMethods } from 'suli-violin-website-types/src'

export const programsApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: any //TODO: Should be ProgramsAPIItem[]
  ) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/programs'`)

  const result = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/programs${query ? query : ''}`, data as AxiosRequestConfig)

  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.post ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])