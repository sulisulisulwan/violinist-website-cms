import { useEffect } from "react"
import { playlistFormFieldStateIF } from 'suli-violin-website-types/src'


export const useTrackPositionControls = (formFieldValues: playlistFormFieldStateIF, setFormFieldValues: React.Dispatch<React.SetStateAction<any>>) => {

  const removeTrack = (index: number) => {
    const playlist = formFieldValues.playlistTracks.slice()
    playlist.splice(index, 1) 
    setFormFieldValues((prevState: any) => ({
      ...prevState,
      playlistTracks: playlist
    }))
  } 
  
  const moveTrack = (index: number, direction: string) => {
    let trackToSwapIndex
    
    if (direction === 'up') {
      trackToSwapIndex = index - 1
    }
    
    if (direction === 'down') {
      trackToSwapIndex = index + 1
    }
  
    const playlist = formFieldValues.playlistTracks.slice()
    const toSwapWith = playlist[trackToSwapIndex]
    const selected = playlist[index]
  
    playlist[index] = toSwapWith
    playlist[trackToSwapIndex] = selected

    setFormFieldValues((prevState: any) => {
      const newState = {
        ...prevState,
        playlistTracks: playlist
      }
      return newState
    })
  }

  return {
    moveTrack,
    removeTrack
  }
}
