import { AxiosResponse } from "axios"

export const audioInboundTransformer = (apiData: AxiosResponse) => {
  const audioData = apiData.data
  return {
    dataType: 'audio',
    results: audioData
  }
}
