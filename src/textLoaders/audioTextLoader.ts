import { useEffect } from "react"
import { getInitFormFieldsState } from "../initFormFieldsStates"
import { AudioTrackDataAPI, audioFormFieldStateIF, initStateIF, setStateSSA } from 'suli-violin-website-types/src'

const audioTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<audioFormFieldStateIF>>) => {
  
  useEffect(() => {

    if (state.currWorkflow === 'loadText') {
      
      const targetDoc = state.editDocId === null ? 
        getInitFormFieldsState('audio')
        : state.fetchedData.results.find((audioTrack: AudioTrackDataAPI) => {
          return state.editDocId === audioTrack.id
        })
        
      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues({
        author: targetDoc.author,
        title: targetDoc.title,
        uploadPath: targetDoc.uploadPath
      })
    }
    
  }, [state])
}

export default audioTextLoader