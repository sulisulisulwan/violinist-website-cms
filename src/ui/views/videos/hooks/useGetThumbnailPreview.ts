import { useEffect, useState } from "react"
import { photosFormFieldStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'
import { photosApiHandler } from "../../../../api/handlers/photos"
import config from "../../../../config/config"

export const useGetThumbnailPreview = (
  formFieldValues: photosFormFieldStateIF | videosFormFieldStateIF, 
  formRef: HTMLFormElement, 
  editDocId: number
) => {

  const [ thumbnailPreviewSrc, setThumbnailPreviewSrc ] = useState(null)

  if (formFieldValues.hasOwnProperty('thumbnailUploadPath')) {
    const videoFormFieldValues = (formFieldValues as videosFormFieldStateIF)
    useEffect(() => {
        const { currPref } = videoFormFieldValues.thumbnailUploadPath
    
        if (currPref && videoFormFieldValues.thumbnailUploadPath[currPref].length) {
    
          if (currPref === 'custom') {
            const file = (formRef[4] as any).files[0]
            const reader = new FileReader()
            reader.onload = (e) => setThumbnailPreviewSrc(e.target.result) 
            reader.readAsDataURL(file)
            return
          }
    
          setThumbnailPreviewSrc(videoFormFieldValues.thumbnailUploadPath[currPref])
          return
        }
    
        setThumbnailPreviewSrc(null)
        
    }, [videoFormFieldValues.thumbnailUploadPath, videoFormFieldValues.youtubeCode.isValid, editDocId])
  } else {

    const photosFormFieldValues = (formFieldValues as photosFormFieldStateIF)
    useEffect(() => {

      let src = thumbnailPreviewSrc
      
      if (formRef && editDocId) {
        src = config.getField('BACKEND_API_BASE_URL') + `/media/photos?id=${editDocId}`
      }
  
      if (formRef && !editDocId) {
        const file = (formRef[0] as any).files[0]

        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => setThumbnailPreviewSrc(e.target.result) 
          reader.readAsDataURL(file)
          src = photosFormFieldValues.uploadPath
        }
      } 

      setThumbnailPreviewSrc(src)

        
    }, [photosFormFieldValues.uploadPath, editDocId])



  }



  return thumbnailPreviewSrc
}