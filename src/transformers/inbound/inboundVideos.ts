import { AxiosResponse } from "axios"

export const videosInboundTransformer = (apiData: AxiosResponse) => {
  return {
    dataType: 'videos',
    results: apiData.data.results
  }
}
