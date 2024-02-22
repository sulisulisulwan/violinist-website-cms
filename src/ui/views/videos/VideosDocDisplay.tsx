import * as React from 'react'
const { useContext } = React
import { GlobalAppStateManagement } from '../../../App'
import config from '../../../config'
import { VideoDataAPI } from 'suli-violin-website-types/src'


const VideoDocDisplay = () => {

  const [ globalAppState, setGlobalAppState ] = useContext(GlobalAppStateManagement)
  const videos: VideoDataAPI[] = globalAppState.fetchedData.media.videos
  const targetDoc = videos.find((video) => video.id === globalAppState.displayDocId)

  if (!targetDoc) return null

  const thumbnailSrc = config.BACKEND_API_BASE_URL + '/media/videos/thumbnail?id=' + targetDoc.id

  return (
    <div>
      <div style={{
        paddingTop: 20,
        paddingLeft: 10
      }}>
        <span style={{ fontWeight: 900 }}>Caption: </span><span>{targetDoc.caption}</span>
      </div>
      <div style={{
        width: "100%",
        aspectRatio: '16/9',
        paddingTop: 10,
        textAlign: 'center'
      }}>
        <iframe 
          width="90%"
          height="90%" 
          src={`https://www.youtube.com/embed/${targetDoc.youtubeCode}`}
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        />
      </div>
      <span style={{ fontWeight: 900, padding: 10}}>Thumbnail:</span>
      <div style={{
        paddingTop: 10,
        height: 200,
        minHeight: 200,
        textAlign: 'center'
      }}>
        <img
          height={'100%'}
          src={thumbnailSrc}
        /> 
      </div>
    </div>
  )
}

export default VideoDocDisplay