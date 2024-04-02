import * as React from 'react'
import ListButton from '../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { AudioTrackDataAPI } from 'suli-violin-website-types/src'
import HoveringDiv from '../blog/HoveringDiv'
const { useContext } = React

const AudioListItems = () => {

  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ state, setState ] = appStateManagement

  const audio: { dataType: 'audio', results: AudioTrackDataAPI[] }= state.fetchedData
  if (!audio || audio.dataType !== 'audio') return null

  const deleteClickHandler = (id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <div>{ audio.results.length ? audio.results.map((audioTrack, index: number) => {
      return (
        <div 
          key={index}
          style={{
            padding: '5px',
            border: 'gray solid 1px',
            backgroundColor: index % 2 === 0 ? 'whitesmoke' : 'white',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <HoveringDiv stylesOverride={{ width: '100%' }}>
            <div 
              style={{
                display: 'flex', 
                flexDirection: 'column',
                width: '100%'
              }}
              onClick={(e) => { setState((prevState) => ({ ...prevState, displayDocId: audioTrack.id }))} }
            >
              <div>
                <span style={{ fontWeight: 'bold' }}>Author: </span>
                <span
                  style={{
                    fontSize: 17,
                    // fontWeight: 600
                  }}
                >{' ' + audioTrack.author}</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Title: </span>
                <span
                  style={{
                    fontSize: 17  
                  }}
                >{audioTrack.title}</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Filename: </span>
                <span
                  style={{
                    fontSize: 17  
                  }}
                >{audioTrack.originalFileName}</span>
              </div>
            </div>
          </HoveringDiv>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListButton 
              isDisabled={false} 
              text='DELETE' 
              onClickHandler={(e) => deleteClickHandler(audioTrack.id)}
            />
          </div>
        </div>
      )
    }) : 'No Audio Tracks!' }</div>
  )
}

export default AudioListItems