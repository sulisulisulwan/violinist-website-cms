import { playlistFormFieldStateIF, validationObjIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const playlistsFormValidator = (formValues: playlistFormFieldStateIF): validationObjIF => {

  const validationData = getValidationObject()

  if (!formValues.name.length) {
    validationData.isValid = false
    validationData.errorMessage = 'A playlist needs a title to be saved!'
  }

  return validationData
}