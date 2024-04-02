import axios from 'axios'
import config from '../../config/config'
import { httpMethods } from 'suli-violin-website-types/src'

export const mediaApiHandler = async (method: httpMethods) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/media'`)

  const result = await fetcher(`${config.getField('BACKEND_API_BASE_URL')}/media`)
  return result
}

const validMethodsMap = new Map([
  ['GET', axios.get ]
])