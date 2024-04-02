import axios from "axios"
import { useContext, useEffect } from "react"
import { videosFormFieldStateIF } from 'suli-violin-website-types/src'
import config from "../../../../config/config"
import { GlobalAppStateManagement } from "../../../../Cms"

export const useTestIsValidYoutubeCode = (setFormFieldValues: React.Dispatch<React.SetStateAction<videosFormFieldStateIF>>, formFieldValues: videosFormFieldStateIF) => {

  const config = useContext(GlobalAppStateManagement).config

  useEffect(() => {

    const testYoutubeCode = async () => {

      try {
        const result = await axios.get(`${config.getField('BACKEND_API_BASE_URL')}/media/videos/validateYoutubeCode?youtubeCode=${formFieldValues.youtubeCode.code}`)
        const isValid = result.data.isValid

        if (isValid !== formFieldValues.youtubeCode.isValid) {
          setFormFieldValues((prevState) => ({
            ...prevState,
            thumbnailUploadPath: {
              ...prevState.thumbnailUploadPath,
              defaultYT: `https://img.youtube.com/vi/${formFieldValues.youtubeCode.code}/0.jpg`,
            },
            youtubeCode: {
              ...prevState.youtubeCode,
              isValid
            }
          }
          ))
        }
      } catch(e) {
        
        console.error(e)
      }
    }

    testYoutubeCode()
  }, [formFieldValues.youtubeCode.code])
}