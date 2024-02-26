import axios, { AxiosRequestConfig } from 'axios'
import config from '../../../config'
import { OutboundTransformedVideos, httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config


export const videosApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: OutboundTransformedVideos
) => {
  
  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/videos'`)

  let url 

  if (method === 'POST') url = `${BACKEND_API_BASE_URL}/media/videos${query ? query : ''}`
  if (method === 'GET') url = `${BACKEND_API_BASE_URL}/media${query ? query : ''}`
  if (method === 'GET' && query) url = `${BACKEND_API_BASE_URL}/media/videos${query ? query : ''}`
  if (['DELETE','PATCH'].includes(method)) url = `${BACKEND_API_BASE_URL}/media/videos${query ? query : ''}`

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