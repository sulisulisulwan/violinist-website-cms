import { AxiosResponse } from "axios"

export const mediaInboundTransformer = (apiData: AxiosResponse) => {
  return {
    dataType: 'media',
    ...apiData.data
  }
}
