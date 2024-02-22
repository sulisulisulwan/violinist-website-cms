import { useEffect, useState } from "react"
import { getInitFormFieldsState } from "../../../../initFormFieldsStates"
import { formTypes } from 'suli-violin-website-types/src'

export const useFormInitializer = (currentTab: formTypes): [ string, any, React.Dispatch<React.SetStateAction<any>> ] => {
  
  const [ currFormType, setCurrFormType ] = useState(currentTab)
  const [ formFieldValues, setFormFieldValues ] = useState(getInitFormFieldsState(currentTab))

  useEffect(() => { 
    setFormFieldValues(getInitFormFieldsState(currentTab))
    setCurrFormType(currentTab)
  }, [currentTab] )

  return [ currFormType, formFieldValues, setFormFieldValues ]
}