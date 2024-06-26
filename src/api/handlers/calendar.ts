import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { EventGroupAPI, httpMethods } from 'suli-violin-website-types/src'

export const calendarApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: EventGroupAPI
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/calendar'`)

  const result = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/calendar${query ? query : ''}`, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.post ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ],
])