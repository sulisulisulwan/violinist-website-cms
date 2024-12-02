import * as React from 'react'
const { useState, useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import useTextLoader from '../../../hooks/useTextLoader'
import { bioFormFieldStateIF } from 'suli-violin-website-types/src'
import * as CMSTextEditor from 'texteditorforcms'
import toolbarSettings from '../toolbarSettings'

const { TextEditor } = CMSTextEditor

interface bioEditFormPropsIF {
  formFieldValues: bioFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<bioFormFieldStateIF>>
}

const BioEditForm = ({ formFieldValues, setFormFieldValues }: bioEditFormPropsIF) => {


  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState ] = appStateManagement

  const [ titleInputFocused, setTitleInputFocused ] = useState(false)
  
  useTextLoader('bio', setFormFieldValues)

  return (
    <div 
      className="bio-edit-form"
      style={{
        height: 'calc(100% - 62px)'
      }}
    >
      <div style={{
        height: '50px'
      }}>
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

      <TextEditor
        html={formFieldValues.textEditorText || ''}
        setHtml={(newText: string) => { setFormFieldValues((prevState: any) => ({
          ...prevState,
          textEditorText: newText
        }))}}
        toolbar={toolbarSettings}
        style={{
          width: '95%',
          height: 'calc(100% - 150px)',
          border: 'red solid 1px'
        }}
      />
    </div>
  )
}

export default BioEditForm