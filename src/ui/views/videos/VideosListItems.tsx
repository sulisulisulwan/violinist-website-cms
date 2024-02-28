import * as React from 'react'
const { useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import ListButton from '../../sharedComponents/ListButton'
import { VideoDataAPI } from 'suli-violin-website-types/src'
import config from '../../../../config'

const VideosListItems = () => {

  const [ state, setState ] = useContext(GlobalAppStateManagement)

  const videos: VideoDataAPI[] = state.fetchedData?.media?.videos
  if (!videos) return null
  
  const deleteClickHandler = (id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }


  return (
    <div>{ videos.length ? videos.map((video, index: number) => {
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
          <div style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              height: 100,
              width: 150,
              
            }}>
              <img
                style={{
                  border: 'gray solid 1px'
                }}
                height={'100%'}
                // width={200}
                src={`${config.BACKEND_API_BASE_URL}/media/videos/thumbnail?id=${video.id}`}
              />
            </div>
            <div>
              Caption: <span>{video.caption}</span>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <ListButton
              text={'DISPLAY'}
              onClickHandler={(e) => { setState((prevState) => ({ ...prevState, displayDocId: video.id }))} }
              isDisabled={false}
            />
            <ListButton
              text={'EDIT'}
              onClickHandler={() => { setState((prevState) => ({ 
                ...prevState, 
                editDocId: video.id,
                displayDocId: video.id,
                currWorkflow: 'edit',
              }))} }
              isDisabled={false}
            />
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