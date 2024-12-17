import { useEffect } from "react"
import { getInitFormFieldsState } from "../../initFormFieldsStates"
import { PlaylistItemAPI, PlaylistTrackAPI, initStateIF, playlistFormFieldStateIF, setStateSSA } from 'suli-violin-website-types/src'

const playlistsTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<playlistFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {
      
      let newState: playlistFormFieldStateIF
      if (state.editDocId === null) {
        newState = getInitFormFieldsState('playlists') as playlistFormFieldStateIF
      } else {
        const targetDoc = state.fetchedData.results.playlists.find((doc: PlaylistItemAPI) => state.editDocId === doc.id)
        newState = {
          name: targetDoc.name,
          playlistTracks: targetDoc.playlistTracks.map((track: PlaylistTrackAPI) => ({ id: track.id, audioTrackId: track.audioTrackId }))
        }
      }


      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues(newState)
    }

    
  }, [state])
}

export default playlistsTextLoader