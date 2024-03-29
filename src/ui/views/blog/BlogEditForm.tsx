import * as React from 'react'
const { useEffect, useState, useContext } = React
import { GlobalAppStateManagement } from '../../../Cms'
import useTextLoader from '../../../textLoaders/_useTextLoader'
import { formatDate } from './BlogDocDisplay'
import { blogFormFieldStateIF } from 'suli-violin-website-types/src'


interface blogEditFormPropsIF {
  formFieldValues: blogFormFieldStateIF
  setFormFieldValues: React.Dispatch<React.SetStateAction<any>>
}

const BlogEditForm = ({ formFieldValues, setFormFieldValues }: blogEditFormPropsIF) => {
  const [ globalAppState ] = useContext(GlobalAppStateManagement)

  const [ titleInputFocused, setTitleInputFocused ] = useState(false)
  const [ textareaFocused, setTextareaFocused ] = useState(false)
  
  useTextLoader('blog', setFormFieldValues)

  return (
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
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
      <textarea 
        id="blog-entry-edit-form-content"
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

export default BlogEditForm