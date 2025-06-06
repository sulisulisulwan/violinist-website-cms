import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { OutboundTransformedAudio, httpMethods } from 'suli-violin-website-types/src'

export const audioApiHandler = async (
  method: httpMethods, 
  query?: string,
  data?: OutboundTransformedAudio
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/audio'`)

  let url 

  if (['GET', 'POST', 'DELETE','PATCH'].includes(method)) url = `${config.getField('BACKEND_API_BASE_URL')}/audio${query ? query : ''}`
  
  const result = await fetcher(url, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.postForm ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])