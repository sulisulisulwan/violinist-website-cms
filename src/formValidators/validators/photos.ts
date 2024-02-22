import { photosFormFieldStateIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const photosFormValidator = (form: photosFormFieldStateIF) => {

  const validationData = getValidationObject()

  const { uploadPath, photoCred } = form

  if (uploadPath !== undefined && !uploadPath.length) {
    validationData.isValid = false
    validationData.errorMessage = 'You must upload a file!'
    return validationData
  }
  
  if (uploadPath) {
    let split = uploadPath.split('.')
    const fileType = split[split.length - 1]
    if (!['jpg', 'jpeg', 'png'].includes(fileType.toLowerCase())) {
      validationData.isValid = false
      validationData.errorMessage = 'Uploaded file must be a valid image file (jpg, jpeg, png)!'
      return validationData
    }
  }
  
  if (!photoCred) {
    validationData.isValid = false
    validationData.errorMessage = 'There must be a photo credit for image!'
    return validationData
  }

  return validationData
}