import * as React from 'react'
const { useState, useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import useTextLoader from '../../../textLoaders/_useTextLoader'
import { useTrackPositionControls } from './useTrackPositionControls'
import { AudioTrackDataAPI, initStateIF, playlistFormFieldStateIF } from 'suli-violin-website-types/src'

interface playListsEditFormPropsIF {
  formFieldValues: playlistFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<any>>
}

const PlaylistsEditForm = ({ formFieldValues, setFormFieldValues }: playListsEditFormPropsIF) => {

  const [ globalAppState ] = useContext(GlobalAppStateManagement)
  useTextLoader('playlists', setFormFieldValues)
  const { moveTrack, removeTrack } = useTrackPositionControls(formFieldValues, setFormFieldValues)

  const findAudioTrackById = (audioId: number): AudioTrackDataAPI => {
    return globalAppState.fetchedData?.media?.audio.find((audioTrackData: AudioTrackDataAPI) => audioId === audioTrackData.id) || null
  }

  return (
    <div>
      <label>
        Name: 
        <input 
          onChange={(e) => setFormFieldValues((prevState: any) => ({ ...prevState, name: e.target.value }))}
          disabled={!globalAppState.editFieldsEnabled}
          value={formFieldValues.name}
        />
      </label>
      <div style={{
        paddingTop: 20,
        display: 'flex'
      }}>
        <div 
          style={{
            width: '50%'
          }}
        >
          PLAYLIST
          {
            formFieldValues.playlistTracks.map((track, index) => {
              const targetTrackData = findAudioTrackById(track.audioTrackId)
              return (
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: index % 2 === 0 ? 'aliceblue' : 'white',
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 10,
                    marginBottom: 10,
                  } as any}
                  key={index}
                  >
                    <div style={{
                      display: 'flex'
                    }}>
                      <div style={{ minHeight: '100%' }}>
                        <button onClick={() => removeTrack(index)} style={{ minHeight: '100%' }}>X</button>
                      </div>
                      <div style={{ paddingLeft: 10 }}>
                        <div><span style={{ fontWeight: 900, paddingRight: 10 }}>Author:</span> {targetTrackData.author}</div>
                        <div><span style={{ fontWeight: 900, paddingRight: 10  }}>Title:</span> {targetTrackData.title}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <button 
                        disabled={index === 0}
                        onClick={() => moveTrack(index, 'up')}
                        >&uarr;</button>
                      <button 
                        disabled={index === formFieldValues.playlistTracks.length - 1}
                        onClick={() => moveTrack(index, 'down')}
                      >&darr;</button>
                    </div>
                </div>
              )
            })
          }
        </div>
        <AvailableTracks globalAppState={globalAppState} setFormFieldValues={setFormFieldValues} />
      </div>
    </div>
  )
} 


interface availableTracksPropsIF {
  globalAppState: initStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<any>>
}

const AvailableTracks = ({ globalAppState, setFormFieldValues }: availableTracksPropsIF) => {

  return (
    <div
      style={{
        width: '50%'
      }}
    >
      <div>AVAILABLE TRACKS</div>
      { 
        globalAppState.editFieldsEnabled ? globalAppState.fetchedData?.media?.audio.map((audioTrackData: AudioTrackDataAPI, index: number) => {

        return (
          <div 
            style={{
              display: 'flex',
              background: index % 2 === 0 ? 'lightgray' : 'white',
              marginTop: 5,
              marginBottom: 5,
            }}
            key={audioTrackData.id + index}
          >
            <div style={{
              minHeight: '100%',
              paddingRight: 10
            }}>
              <button 
                onClick={() => { setFormFieldValues((prevState: any) => {
                  const playlist = prevState.playlistTracks.slice()
                  playlist.push({
                    id: null,
                    audioTrackId: audioTrackData.id
                  })
                  return {
                    ...prevState,
                    playlistTracks: playlist
                  }
                }) }}
                style={{
                  minHeight: '90%'
                }}
              >+</button>
            </div>
            <div>
              <div><span style={{ fontWeight: 900, paddingRight: 10 }}>Author:</span> {audioTrackData.author}</div>
              <div><span style={{ fontWeight: 900, paddingRight: 10  }}>Title:</span> {audioTrackData.title}</div>
            </div>
          </div>
        ) 
        }) : null 
      }
    </div>
  )
}

export default PlaylistsEditForm