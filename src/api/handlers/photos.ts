import axios, { AxiosRequestConfig } from 'axios'
import config from '../../../config'
import { OutboundTransformedPhotos, httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config


export const photosApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: OutboundTransformedPhotos
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/photos'`)

  let url 

  if (['POST'].includes(method)) {
    url = `${BACKEND_API_BASE_URL}/media/photos${query ? query : ''}`
  }

  if (method === 'GET') url = `${BACKEND_API_BASE_URL}/media/photos?type=media-photo${query ? query : ''}`
  if (method === 'GET' && query) url = `${BACKEND_API_BASE_URL}/media/photos${query ? query : ''}`

  if (['DELETE','PATCH'].includes(method)) url = `${BACKEND_API_BASE_URL}/media/photos${query ? query : ''}`
  
  const result = await fetcher(url, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.postForm ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])