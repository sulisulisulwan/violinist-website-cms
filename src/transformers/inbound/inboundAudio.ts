import { AxiosResponse } from "axios"

export const audioInboundTransformer = (apiData: AxiosResponse) => {
  const audioData = apiData.data.audio
  return {
    dataType: 'audio',
    results: audioData
  }
}
