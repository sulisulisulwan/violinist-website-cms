import axios, { AxiosRequestConfig } from 'axios'
import config from '../../../config'
import { PlaylistItemAPI, httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config

export const playlistsApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: PlaylistItemAPI
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/media/audio/playlists'`)

  let url

  if (['POST'].includes(method)) {
    url = `${BACKEND_API_BASE_URL}/media/photos${query ? query : ''}`
  }

  if (['DELETE','PATCH'].includes(method)) url = `${BACKEND_API_BASE_URL}/media/audio/playlists${query ? query : ''}`

  if (method === 'GET') url = `${BACKEND_API_BASE_URL}/media${query ? query : ''}`
  if (method === 'GET' && query) url = `${BACKEND_API_BASE_URL}/media/audio/playlists${query ? query : ''}`

  const result = await fetcher(`${BACKEND_API_BASE_URL}/media/audio/playlists${query ? query : ''}`, data as AxiosRequestConfig)
  return result
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.post ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])