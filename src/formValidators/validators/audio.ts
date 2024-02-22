import { audioFormFieldStateIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const audioFormValidator = (form: audioFormFieldStateIF) => {

  const validationData = getValidationObject()

  const { uploadPath, author, title } = form

  if (uploadPath !== undefined && !uploadPath.length) {
    validationData.isValid = false
    validationData.errorMessage = 'You must upload a file!'
    return validationData
  }
  
  if (uploadPath) {
    let split = uploadPath.split('.')
    const fileType = split[split.length - 1]
    
    if (fileType !== 'mp3') {
      validationData.isValid = false
      validationData.errorMessage = 'Uploaded file must be an mp3!'
      return validationData
    }
  }
  
  if (!author) {
    validationData.isValid = false
    validationData.errorMessage = 'There must be an author!'
    return validationData
  }
  
  if (!title) {
    validationData.isValid = false
    validationData.errorMessage = 'There must be a title!'
  }

  return validationData
}