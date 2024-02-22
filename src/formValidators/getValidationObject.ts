import { validationObjIF } from 'suli-violin-website-types/src'

export const getValidationObject = (): validationObjIF => {
  return {
    isValid: true,
    errorMessage: null
  }
}