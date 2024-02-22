import axios from 'axios'
import config from '../../config'
import { httpMethods } from 'suli-violin-website-types/src'
const { BACKEND_API_BASE_URL } = config

export const mediaApiHandler = async (method: httpMethods) => {

  const fetcher = validMethodsMap.get(method)

  if (!fetcher) throw new Error(`Invalid method [${method}] used when calling endpoint '/media'`)

  const result = await fetcher(`${BACKEND_API_BASE_URL}/media`)
  return result
}

const validMethodsMap = new Map([
  ['GET', axios.get ]
])