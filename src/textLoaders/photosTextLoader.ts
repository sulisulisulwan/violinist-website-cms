import { useEffect } from "react"
import { PhotoDataAPI, initStateIF, photosFormFieldStateIF, setStateSSA } from 'suli-violin-website-types/src'
import { getInitFormFieldsState } from "../initFormFieldsStates"

const photosTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<photosFormFieldStateIF>>) => {
  useEffect(() => {
    if (state.currWorkflow === 'loadText') {

      const targetDoc = state.editDocId === null ? 
        getInitFormFieldsState('photos')
        : state.fetchedData.media.photos.find((photo: PhotoDataAPI) => {
          return state.editDocId === photo.id
        })
        

      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
      setFormFieldValues(() => ({
        photoCred: targetDoc.photoCred,
        uploadPath: targetDoc.uploadPath
      }))
    }
    
  }, [state])
}

export default photosTextLoader