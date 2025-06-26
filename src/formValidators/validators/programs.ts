import { bioFormFieldStateIF, validationObjIF } from 'suli-violin-website-types/src'
import { getValidationObject } from "../getValidationObject"

export const programsFormValidator = (formValues: bioFormFieldStateIF): validationObjIF => {

  const { titleText } = formValues 

  const validationData = getValidationObject()

  if (!titleText.length) {
    validationData.isValid = false
    validationData.errorMessage = 'A bio document needs a title to be saved!'
  }

  return validationData
}