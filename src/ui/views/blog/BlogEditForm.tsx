import * as React from 'react'
const { useEffect, useState, useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import useTextLoader from '../../../hooks/useTextLoader'
import { formatDate } from './BlogDocDisplay'
import { blogFormFieldStateIF } from 'suli-violin-website-types/src'
import * as CMSTextEditor from 'texteditorforcms'
import toolbarSettings from '../toolbarSettings'

interface blogEditFormPropsIF {
  formFieldValues: blogFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<any>>
}

const { TextEditor } = CMSTextEditor

const BlogEditForm = ({ formFieldValues, setFormFieldValues }: blogEditFormPropsIF) => {
  const { appStateManagement } = useContext(GlobalAppStateManagement)
  const [ globalAppState ] = appStateManagement

  const [ titleInputFocused, setTitleInputFocused ] = useState(false)
  const [ textareaFocused, setTextareaFocused ] = useState(false)
  
  useTextLoader('blog', setFormFieldValues)

  return (
    <div style={{
      height: '100%'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 20
      }}>
        {
          !formFieldValues.dateCreated ? null :
          <span style={{ color: 'gray' }}>Date Created: {formatDate(formFieldValues.dateCreated)}</span>
        }
        {
          formFieldValues.dateCreated === formFieldValues.dateLastModified ? null : 
          <span style={{ paddingBottom: 10, color: 'gray' }}>Date Modified: {formatDate(formFieldValues.dateLastModified)}</span>
        }
      </div>
      <div>
        <input 
          id="blog-entry-edit-form-title"
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
          placeholder={ globalAppState.editFieldsEnabled ? 'Blog Entry Title' : '' } 
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
      {/* <textarea 
        id="blog-entry-edit-form-content"
        style={{
          width: '95%',
          height: 'calc(100% - 150px)',
          background: textareaFocused ? 'aliceBlue' : 'whitesmoke',
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
          textEditorText: e.target.value
          }
          return newState
      })}

        value={formFieldValues.textEditorText || ''}
      ></textarea> */}
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

export default BlogEditForm