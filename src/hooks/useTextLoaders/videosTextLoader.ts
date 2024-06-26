import { useContext, useEffect } from "react"
import { VideoDataAPI, initStateIF, setStateSSA, videosFormFieldStateIF } from 'suli-violin-website-types/src'
import { getInitFormFieldsState } from "../../initFormFieldsStates"
import config from "../../config/config"
import { GlobalAppStateManagement } from "../../Cms"

const videosTextLoader = (state: initStateIF, setState: setStateSSA, setFormFieldValues: React.Dispatch<React.SetStateAction<videosFormFieldStateIF>>) => {

  const config = useContext(GlobalAppStateManagement).config

  useEffect(() => {
    if (state.currWorkflow === 'loadText') {

      if (state.editDocId === null) {
        const form = getInitFormFieldsState('videos')
        setFormFieldValues(form as videosFormFieldStateIF)
      } else {
        const targetDoc = state.fetchedData.results.find((video: VideoDataAPI) => state.editDocId === video.id )
        setFormFieldValues(() => ({
          thumbnailUploadPath: {
            currPref: 'saved',
            defaultYT: '',
            custom: '',
            saved: config.getField('BACKEND_API_BASE_URL') + '/media/videos/thumbnail?id=' + state.editDocId
          } as null,
          youtubeCode: {
            isValid: true,
            code: targetDoc.youtubeCode
          },
          caption: targetDoc.caption
        }))
        
      }

      setState((prevState) => ({ ...prevState, currWorkflow: '' }))
    }
    
  }, [state])
}

export default videosTextLoader