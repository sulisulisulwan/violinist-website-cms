import { videosFormFieldStateIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const videosFormValidator = (formValues: videosFormFieldStateIF) => {

  const validationData = getValidationObject()

  if (!formValues.youtubeCode.isValid) {
    validationData.isValid = false
    validationData.errorMessage = 'You must provide a valid youtube code!'
    return validationData
  }
  
  if (!formValues.caption.length) {
    validationData.isValid = false
    validationData.errorMessage = 'You must provide a caption!'
    return validationData
  }

  if (formValues.thumbnailUploadPath === null) {
    validationData.isValid = false
    validationData.errorMessage = 'You must choose a thumbnail preference!'
    return validationData
  }
  
  if (formValues.thumbnailUploadPath.currPref === 'custom') {
    if (!formValues.thumbnailUploadPath.custom.length) {
      validationData.isValid = false
      validationData.errorMessage = 'If choosing a custom image, you must upload a file!'
    }
  } 

  return validationData
}