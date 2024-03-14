import { AxiosResponse } from "axios"

export const playlistsInboundTransformer = (apiData: { audioResponse: AxiosResponse, playlistsResponse: AxiosResponse}) => {

  const audioData = apiData.audioResponse.data
  const playlistsData = apiData.playlistsResponse.data


  return {
    dataType: 'playlists',
    results: {
      audio: audioData,
      playlists: playlistsData
    }
  }
}
