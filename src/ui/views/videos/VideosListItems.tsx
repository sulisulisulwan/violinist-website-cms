import * as React from 'react'
const { useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import ListButton from '../sharedComponents/ListButton'
import { VideoDataAPI } from 'suli-violin-website-types/src'
import config from '../../../config/config'
import HoveringDiv from '../blog/HoveringDiv'

const VideosListItems = () => {

  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement

  const videos: { dataType: 'videos', results: VideoDataAPI[]} = state.fetchedData
  if (!videos || videos.dataType !== 'videos') return null
  
  const deleteClickHandler = (id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }


  return (
    <div>{ videos.results.length ? videos.results.map((video, index: number) => {
      return (
        <div 
          key={index}
          style={{
            border: 'gray solid 1px',
            display: 'flex',
            padding: 5,
            justifyContent: 'space-between'
          }}
        >
          <HoveringDiv stylesOverride={{ width: '100%' }}>
            <div 
              onClick={(e) => { setState((prevState) => ({ ...prevState, displayDocId: video.id }))} }
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <div 
                
                style={{
                  height: 100,
                  width: 150,
                }}
              >
                <img
                  style={{
                    border: 'gray solid 1px'
                  }}
                  height={'100%'}
                  src={`${config.getField('BACKEND_API_BASE_URL')}/media/videos/thumbnail?id=${video.id}`}
                />
              </div>
              <div>
                Caption: <span>{video.caption}</span>
              </div>
            </div>
          </HoveringDiv>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <ListButton
              text={'DELETE'}
              onClickHandler={() => deleteClickHandler(video.id)}
              isDisabled={false}
            />
          </div>
        </div>
      )
    }) : 'No Videos!' }</div>
  )
}

export default VideosListItems