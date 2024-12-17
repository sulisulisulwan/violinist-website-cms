import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { OutboundTransformedPhotos, httpMethods } from 'suli-violin-website-types/src'


export const photosApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: OutboundTransformedPhotos
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/photos'`)

  let url  

  if (method === 'GET') url = `${config.getField('BACKEND_API_BASE_URL')}/photos?type=media-photo${query ? query : ''}`
  if (method === 'GET' && query) url = `${config.getField('BACKEND_API_BASE_URL')}/photos${query ? query : ''}`
  if (method === 'POST') url = `${config.getField('BACKEND_API_BASE_URL')}/photos${query ? query : ''}`
  if (['DELETE','PATCH'].includes(method)) url = `${config.getField('BACKEND_API_BASE_URL')}/photos${query ? query : ''}`

  
  const result = await fetcher(url, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.postForm ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])