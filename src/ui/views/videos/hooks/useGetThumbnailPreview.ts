import { useEffect, useState } from "react"
import { photosFormFieldStateIF, videosFormFieldStateIF } from 'suli-violin-website-types/src'

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
  
      if (formRef) {
        const file = (formRef[0] as any).files[0]
        const reader = new FileReader()
        reader.onload = (e) => setThumbnailPreviewSrc(e.target.result) 
        reader.readAsDataURL(file)
        setThumbnailPreviewSrc(photosFormFieldValues.uploadPath)
        return
      }

        
    }, [photosFormFieldValues.uploadPath, editDocId])



  }



  return thumbnailPreviewSrc
}