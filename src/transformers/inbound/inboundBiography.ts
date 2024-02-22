import { AxiosResponse } from "axios"
import { BiographyItemAPI } from 'suli-violin-website-types/src'

export type biographyInboundTransformedData = {
  results: BiographyItemAPI[]
}

export const bioInboundTransformer = (apiData: AxiosResponse): biographyInboundTransformedData => {
  return apiData.data
}
