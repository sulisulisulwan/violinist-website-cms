import { AxiosResponse } from "axios"

export const photosInboundTransformer = (apiData: AxiosResponse) => {
  return {
    dataType: 'photos',
    results: apiData.data
  }
}
