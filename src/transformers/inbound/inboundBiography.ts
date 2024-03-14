import { AxiosResponse } from "axios"
import { BiographyItemAPI } from 'suli-violin-website-types/src'

export type biographyInboundTransformedData = {
  dataType: 'bio'
  results: BiographyItemAPI[]
}

export const bioInboundTransformer = (apiData: AxiosResponse): biographyInboundTransformedData => {
  return {
    dataType: 'bio',
    ...apiData.data
  }
}
