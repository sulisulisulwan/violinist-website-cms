import * as React from 'react'
import ListButton from '../../sharedComponents/ListButton'
import { GlobalAppStateManagement } from '../../../Cms'
import { AudioTrackDataAPI } from 'suli-violin-website-types/src'
const { useContext } = React

const AudioListItems = () => {

  const [ state, setState ] = useContext(GlobalAppStateManagement)

  const audio: AudioTrackDataAPI[] = state.fetchedData?.media?.audio
  if (!audio) return null

  const deleteClickHandler = (id: number) => {
    setState((prevState) => ({ 
      ...prevState, 
      currWorkflow: 'delete',
      deleteDocId: id 
    }))
  }

  return (
    <div>{ audio.length ? audio.map((audioTrack, index: number) => {
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
          <div style={{display: 'flex', flexDirection: 'column'}}>
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ListButton 
              isDisabled={false} 
              text='DISPLAY' 
              onClickHandler={(e) => { setState((prevState) => ({ ...prevState, displayDocId: audioTrack.id }))} }/>
            <ListButton
              isDisabled={state.editDocId === audioTrack.id}
              text={'EDIT'}
              onClickHandler={() => { setState((prevState) => ({ 
                ...prevState, 
                editDocId: audioTrack.id,
                displayDocId: audioTrack.id,
                currWorkflow: 'edit',
              })) }}
            />
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