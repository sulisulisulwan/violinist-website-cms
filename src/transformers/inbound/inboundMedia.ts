import { AxiosResponse } from "axios"

export const mediaInboundTransformer = (apiData: AxiosResponse) => {
  return apiData.data
}
