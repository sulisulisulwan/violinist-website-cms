import axios from "axios"
import { useEffect } from "react"
import { videosFormFieldStateIF } from 'suli-violin-website-types/src'

export const useTestIsValidYoutubeCode = (setFormFieldValues: React.Dispatch<React.SetStateAction<videosFormFieldStateIF>>, formFieldValues: videosFormFieldStateIF) => {
  useEffect(() => {

    const testYoutubeCode = async () => {

      try {
        const result = await axios.get(`http://localhost:3000/validateYoutubeCode?youtubeCode=${formFieldValues.youtubeCode.code}`)
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