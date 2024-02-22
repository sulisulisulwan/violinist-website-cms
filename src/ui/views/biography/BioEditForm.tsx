import * as React from 'react'
const { useState, useContext } = React
import { GlobalAppStateManagement } from '../../../App'
import useTextLoader from '../../../textLoaders/_useTextLoader'
import { bioFormFieldStateIF } from 'suli-violin-website-types/src'

interface bioEditFormPropsIF {
  formFieldValues: bioFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<bioFormFieldStateIF>>
}

const BioEditForm = ({ formFieldValues, setFormFieldValues }: bioEditFormPropsIF) => {

  const [ globalAppState ] = useContext(GlobalAppStateManagement)

  const [ titleInputFocused, setTitleInputFocused ] = useState(false)
  const [ textareaFocused, setTextareaFocused ] = useState(false)
  
  console.log(formFieldValues.textareaText)

  useTextLoader('bio', setFormFieldValues)

  return (
    <div>
      <div>
        <input 
          id="bio-edit-form-title"
          style={{
            background: titleInputFocused ? 'aliceBlue' : 'whitesmoke',
            paddingTop: '10px',
            paddingBottom: '10px',
            fontSize: '15px',
            fontWeight: '900',
            width: '95%',
            marginBottom: '10px',
            outline: titleInputFocused ? 'none' : 'none'
          }}
          placeholder={ globalAppState.editFieldsEnabled ? 'Bio Title' : '' } 
          disabled={!globalAppState.editFieldsEnabled}
          onFocus={() => { setTitleInputFocused(true) }}
          onBlur={() => { setTitleInputFocused(false) }}
          value={formFieldValues.titleText || ''}
          onChange={(e) =>  setFormFieldValues((prevState: any) => ({
            ...prevState,
            titleText: e.target.value
          }))}
        ></input>
      </div>
      <textarea 
        id="bio-edit-form-content"
        style={{
          width: '95%',
          background: textareaFocused ? 'aliceBlue' : 'whitesmoke',
          height: '300px',
          fontFamily: 'Arial',
          fontSize: '15px',
          outline: titleInputFocused ? 'none' : 'none',
          // border: '0'
        }}
        onFocus={() => { setTextareaFocused(true) }}
        onBlur={() => { setTextareaFocused(false) }}
        disabled={!globalAppState.editFieldsEnabled}
        onChange={(e) =>  setFormFieldValues((prevState: any) => {
          
          const newState = {
          ...prevState,
          textareaText: e.target.value
          }
          return newState
      })}

        value={formFieldValues.textareaText || ''}
      ></textarea>
    </div>
  )
}

export default BioEditForm