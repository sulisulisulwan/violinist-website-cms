import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { OutboundTransformedVideos, httpMethods } from 'suli-violin-website-types/src'

export const videosApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: OutboundTransformedVideos
) => {
  
  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/videos'`)

  let url 

  if (method === 'POST') url = `${config.getField('BACKEND_API_BASE_URL')}/videos${query ? query : ''}`
  if (method === 'GET') url = `${config.getField('BACKEND_API_BASE_URL')}/videos${query ? query : ''}`
  if (method === 'GET' && query) url = `${config.getField('BACKEND_API_BASE_URL')}/videos${query ? query : ''}`
  if (['DELETE','PATCH'].includes(method)) url = `${config.getField('BACKEND_API_BASE_URL')}/videos${query ? query : ''}`

  console.log(`data during method ${method}: `, data)
  const result = await fetcher(url, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['GET', axios.get ],
  ['POST', axios.postForm ],
  ['POSTalt', axios.post ],
  ['PATCH', axios.patch ], 
  ['PATCHalt', axios.patchForm ], 
  ['DELETE', axios.delete ]
])