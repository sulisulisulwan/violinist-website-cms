import axios, { AxiosRequestConfig } from 'axios'
import config from '../../config/config'
import { PlaylistItemAPI, httpMethods } from 'suli-violin-website-types/src'

export const playlistsApiHandler = async (
  method: httpMethods, 
  query?: string, 
  data?: PlaylistItemAPI
) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/media/audio/playlists'`)

  let url

  if (['POST'].includes(method)) {
    url = `${config.getField('BACKEND_API_BASE_URL')}/media/photos${query ? query : ''}`
  }

  if (['DELETE','PATCH'].includes(method)) url = `${config.getField('BACKEND_API_BASE_URL')}/media/audio/playlists${query ? query : ''}`

  if (method === 'GET') url = `${config.getField('BACKEND_API_BASE_URL')}/media${query ? query : ''}`
  if (method === 'GET' && query) url = `${config.getField('BACKEND_API_BASE_URL')}/media/audio/playlists${query ? query : ''}`

  const playlistsResponse = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/media/audio/playlists${query ? query : ''}`, data as AxiosRequestConfig)
  const audioResponse = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/media/audio`, data as AxiosRequestConfig)
  return {
    playlistsResponse,
    audioResponse
  }
}

const validMethodsMap = new Map([
  ['PATCH', axios.patch ], 
  ['POST', axios.post ],
  ['GET', axios.get ],
  ['DELETE', axios.delete ]
])