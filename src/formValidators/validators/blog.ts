import { blogFormFieldStateIF, validationObjIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const blogFormValidator = (formValues: blogFormFieldStateIF): validationObjIF => {

  const { titleText } = formValues 

  const validationData = getValidationObject()

  if (!titleText.length) {
    validationData.isValid = false
    validationData.errorMessage = 'A blog document needs a title to be saved!'
  }

  return validationData
}